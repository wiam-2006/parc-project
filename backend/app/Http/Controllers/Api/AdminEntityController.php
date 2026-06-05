<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class AdminEntityController extends Controller
{
    private array $protectedColumns = ['id', 'created_at', 'updated_at', 'email_verified_at', 'remember_token'];

    public function tables()
    {
        $tables = collect($this->managedTables())
            ->filter(fn ($table) => Schema::hasTable($table))
            ->map(fn ($table) => [
                'name' => $table,
                'label' => Str::headline(str_replace('_', ' ', $table)),
                'count' => DB::table($table)->count(),
                'columns' => $this->columns($table),
            ])
            ->values();

        return response()->json(['data' => $tables]);
    }

    public function index(Request $request, string $table)
    {
        $this->authorizeTable($table);
        $columns = $this->columns($table);
        $columnNames = collect($columns)->pluck('name')->all();
        $query = DB::table($table);

        if ($search = trim((string) $request->query('search', ''))) {
            $query->where(function ($builder) use ($columnNames, $search) {
                foreach ($columnNames as $column) {
                    $builder->orWhere($column, 'like', "%{$search}%");
                }
            });
        }

        foreach ($request->query('filters', []) as $column => $value) {
            if ($value !== null && $value !== '' && in_array($column, $columnNames, true)) {
                $query->where($column, $value);
            }
        }

        $sortBy = $request->query('sort_by', 'id');
        $sortDirection = strtolower($request->query('sort_direction', 'desc')) === 'asc' ? 'asc' : 'desc';
        if (!in_array($sortBy, $columnNames, true)) {
            $sortBy = in_array('id', $columnNames, true) ? 'id' : $columnNames[0];
        }

        $rows = $query
            ->orderBy($sortBy, $sortDirection)
            ->paginate(min(max((int) $request->query('per_page', 10), 5), 50));

        $items = collect($rows->items())
            ->map(fn ($row) => $this->redactRow($table, (array) $row))
            ->all();

        return response()->json([
            'columns' => $columns,
            'data' => $items,
            'meta' => [
                'current_page' => $rows->currentPage(),
                'last_page' => $rows->lastPage(),
                'per_page' => $rows->perPage(),
                'total' => $rows->total(),
            ],
        ]);
    }

    public function store(Request $request, string $table)
    {
        $this->authorizeTable($table);
        $payload = $this->payload($request, $table);
        $id = DB::table($table)->insertGetId($payload);

        return response()->json(['data' => $this->redactRow($table, (array) DB::table($table)->where('id', $id)->first())], 201);
    }

    public function update(Request $request, string $table, int $id)
    {
        $this->authorizeTable($table);
        DB::table($table)->where('id', $id)->update($this->payload($request, $table, true));

        return response()->json(['data' => $this->redactRow($table, (array) DB::table($table)->where('id', $id)->first())]);
    }

    public function destroy(string $table, int $id)
    {
        $this->authorizeTable($table);

        if ($table === 'users' && request()->user()?->id === $id) {
            return response()->json(['message' => 'You cannot delete your own administrator account.'], 422);
        }

        DB::table($table)->where('id', $id)->delete();

        return response()->json(['message' => 'Deleted successfully.']);
    }

    private function managedTables(): array
    {
        $fallbackTables = [
            'users',
            'activities',
            'bookings',
            'reservations',
            'menu_items',
            'membership_plans',
            'memberships',
            'contacts',
            'event_inquiries',
            'newsletter_subscribers',
        ];

        try {
            $databaseName = DB::getDatabaseName();
            $tableKey = "Tables_in_{$databaseName}";
            $tables = collect(DB::select('SHOW TABLES'))
                ->map(fn ($row) => (array) $row)
                ->map(fn ($row) => $row[$tableKey] ?? reset($row))
                ->filter()
                ->values()
                ->all();
        } catch (\Throwable) {
            $tables = $fallbackTables;
        }

        $protectedTables = [
            'migrations',
            'failed_jobs',
            'password_reset_tokens',
            'personal_access_tokens',
        ];

        return collect(array_unique([...$fallbackTables, ...$tables]))
            ->filter(fn ($table) => !in_array($table, $protectedTables, true))
            ->values()
            ->all();
    }

    private function authorizeTable(string $table): void
    {
        abort_unless(in_array($table, $this->managedTables(), true) && Schema::hasTable($table), 404, 'Managed table not found.');
    }

    private function columns(string $table): array
    {
        return collect(Schema::getColumnListing($table))->map(function ($column) use ($table) {
            return [
                'name' => $column,
                'label' => Str::headline(str_replace('_', ' ', $column)),
                'editable' => !in_array($column, $this->protectedColumns, true),
                'type' => $this->inputType($table, $column),
            ];
        })->all();
    }

    private function inputType(string $table, string $column): string
    {
        if (Str::contains($column, ['password'])) {
            return 'password';
        }
        if (Str::contains($column, ['email'])) {
            return 'email';
        }
        if (Str::endsWith($column, ['_date']) || in_array($column, ['date', 'start_date', 'expiration_date'], true)) {
            return 'date';
        }
        if (Str::startsWith($column, ['is_', 'has_']) || in_array($column, ['active', 'available'], true)) {
            return 'boolean';
        }
        if (Str::contains($column, ['description', 'requests', 'features'])) {
            return 'textarea';
        }
        if (Str::contains($column, ['price', 'total', 'guests', 'adults', 'children', 'order', 'sort', 'months'])) {
            return 'number';
        }

        return 'text';
    }

    private function payload(Request $request, string $table, bool $updating = false): array
    {
        $columns = collect($this->columns($table))->where('editable', true)->pluck('name')->all();
        $payload = $request->only($columns);

        if ($table === 'users') {
            if (empty($payload['password'])) {
                unset($payload['password']);
            } elseif (!Str::startsWith($payload['password'], '$2y$')) {
                $payload['password'] = Hash::make($payload['password']);
            }
        }

        foreach ($payload as $key => $value) {
            $type = $this->inputType($table, $key);
            if ($type === 'boolean') {
                $payload[$key] = filter_var($value, FILTER_VALIDATE_BOOLEAN);
            }
            if ($key === 'features' && is_string($value)) {
                $decoded = json_decode($value, true);
                $payload[$key] = json_encode($decoded ?: array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $value))));
            }
        }

        if (!$updating && Schema::hasColumn($table, 'created_at')) {
            $payload['created_at'] = now();
        }
        if (Schema::hasColumn($table, 'updated_at')) {
            $payload['updated_at'] = now();
        }

        return $payload;
    }

    private function redactRow(string $table, array $row): array
    {
        if ($table === 'users' && array_key_exists('password', $row)) {
            $row['password'] = '';
        }

        return $row;
    }
}
