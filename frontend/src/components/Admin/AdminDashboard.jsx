import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  BarChart3,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Database,
  Edit3,
  Eye,
  Hotel,
  LayoutDashboard,
  LogOut,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  Utensils,
  Users,
  X,
} from 'lucide-react';
import { adminAuth, adminData } from '../../api/adminApi';
import './AdminDashboard.css';

const TOKEN_KEY = 'funzone_admin_token';

const featuredSections = [
  { table: 'users', label: 'User management', icon: Users },
  { table: 'bookings', label: 'Activity reservations', icon: CalendarDays },
  { table: 'reservations', label: 'Restaurant reservations', icon: Utensils },
  { table: 'memberships', label: 'Accommodation / memberships', icon: Hotel },
  { table: 'activities', label: 'Activities management', icon: Activity },
  { table: 'menu_items', label: 'Restaurants management', icon: Utensils },
];

const formatLabel = (value = '') =>
  value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const compactValue = (value) => {
  if (value === null || value === undefined || value === '') return '-';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'object') return JSON.stringify(value);
  const stringValue = String(value);
  return stringValue.length > 72 ? `${stringValue.slice(0, 72)}...` : stringValue;
};

function LoginPanel({ onLogin }) {
  const [form, setForm] = useState({ email: 'admin@funzone.local', password: 'Admin@12345' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await adminAuth.login(form);
      localStorage.setItem(TOKEN_KEY, response.data.token);
      onLogin(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to sign in with these credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-login">
      <div className="admin-login__panel">
        <div className="admin-login__brand">
          <ShieldCheck size={34} />
          <div>
            <p>Funzone Park</p>
            <h1>Admin Dashboard</h1>
          </div>
        </div>

        <form onSubmit={submit} className="admin-login__form">
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              required
            />
          </label>
          {error && <div className="admin-alert">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </section>
  );
}

function RecordModal({ mode, row, columns, onClose, onSubmit }) {
  const editableColumns = columns.filter((column) => column.editable);
  const [form, setForm] = useState(() =>
    editableColumns.reduce((draft, column) => {
      draft[column.name] = row?.[column.name] ?? (column.type === 'boolean' ? false : '');
      return draft;
    }, {})
  );

  const submit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="admin-modal" role="dialog" aria-modal="true">
      <div className="admin-modal__panel">
        <div className="admin-modal__header">
          <div>
            <p>{mode === 'view' ? 'Record details' : mode === 'edit' ? 'Edit record' : 'Create record'}</p>
            <h2>{row?.id ? `#${row.id}` : 'New entry'}</h2>
          </div>
          <button className="admin-icon-btn" type="button" onClick={onClose} title="Close">
            <X size={18} />
          </button>
        </div>

        {mode === 'view' ? (
          <div className="admin-detail-grid">
            {columns.map((column) => (
              <div key={column.name}>
                <span>{column.label}</span>
                <strong>{compactValue(row?.[column.name])}</strong>
              </div>
            ))}
          </div>
        ) : (
          <form className="admin-form-grid" onSubmit={submit}>
            {editableColumns.map((column) => (
              <label key={column.name}>
                {column.label}
                {column.type === 'textarea' ? (
                  <textarea
                    value={form[column.name] ?? ''}
                    onChange={(event) => setForm({ ...form, [column.name]: event.target.value })}
                    rows={4}
                  />
                ) : column.type === 'boolean' ? (
                  <select
                    value={String(Boolean(form[column.name]))}
                    onChange={(event) => setForm({ ...form, [column.name]: event.target.value === 'true' })}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                ) : (
                  <input
                    type={column.type}
                    value={form[column.name] ?? ''}
                    onChange={(event) => setForm({ ...form, [column.name]: event.target.value })}
                  />
                )}
              </label>
            ))}
            <div className="admin-modal__actions">
              <button type="button" className="admin-secondary-btn" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="admin-primary-btn">
                Save record
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function AdminDashboard({ onExit }) {
  const [user, setUser] = useState(null);
  const [tables, setTables] = useState([]);
  const [stats, setStats] = useState(null);
  const [activeTable, setActiveTable] = useState('');
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, per_page: 10, total: 0 });
  const [search, setSearch] = useState('');
  const [filterColumn, setFilterColumn] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [sort, setSort] = useState({ sort_by: 'id', sort_direction: 'desc' });
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [notice, setNotice] = useState('');

  const activeTableMeta = useMemo(
    () => tables.find((table) => table.name === activeTable),
    [tables, activeTable]
  );

  const loadShell = async () => {
    setLoading(true);
    try {
      const [meResponse, statsResponse, tablesResponse] = await Promise.all([
        adminAuth.me(),
        adminData.stats(),
        adminData.tables(),
      ]);
      setUser(meResponse.data.user);
      setStats(statsResponse.data);
      setTables(tablesResponse.data.data);
      setActiveTable((current) => current || tablesResponse.data.data[0]?.name || '');
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loadRows = async (page = meta.current_page || 1) => {
    if (!activeTable) return;
    setLoading(true);
    try {
      const filters = filterColumn && filterValue ? { [filterColumn]: filterValue } : {};
      const response = await adminData.tableRows(activeTable, {
        page,
        per_page: meta.per_page,
        search,
        filters,
        ...sort,
      });
      setColumns(response.data.columns);
      setRows(response.data.data);
      setMeta(response.data.meta);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem(TOKEN_KEY)) {
      loadShell();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user && activeTable) {
      loadRows(1);
    }
  }, [user, activeTable, search, filterColumn, filterValue, sort]);

  const logout = async () => {
    try {
      await adminAuth.logout();
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
      onExit?.();
    }
  };

  const saveRecord = async (payload) => {
    if (modal.mode === 'edit') {
      await adminData.update(activeTable, modal.row.id, payload);
      setNotice('Record updated successfully.');
    } else {
      await adminData.create(activeTable, payload);
      setNotice('Record created successfully.');
    }
    setModal(null);
    await Promise.all([loadShell(), loadRows(meta.current_page)]);
  };

  const deleteRecord = async (row) => {
    if (!window.confirm(`Delete record #${row.id}?`)) return;
    await adminData.destroy(activeTable, row.id);
    setNotice('Record deleted successfully.');
    await Promise.all([loadShell(), loadRows(meta.current_page)]);
  };

  const toggleSort = (column) => {
    setSort((current) => ({
      sort_by: column,
      sort_direction:
        current.sort_by === column && current.sort_direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  if (loading && !user && localStorage.getItem(TOKEN_KEY)) {
    return <div className="admin-loading">Loading admin workspace...</div>;
  }

  if (!user) {
    return <LoginPanel onLogin={loadShell} />;
  }

  return (
    <section className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <LayoutDashboard size={26} />
          <div>
            <strong>Funzone</strong>
            <span>Administration</span>
          </div>
        </div>

        <nav>
          {featuredSections.map(({ table, label, icon: Icon }) => (
            <button
              key={table}
              className={activeTable === table ? 'active' : ''}
              type="button"
              onClick={() => setActiveTable(table)}
              disabled={!tables.some((item) => item.name === table)}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar__tables">
          <span>Database tables</span>
          {tables.map((table) => (
            <button
              key={table.name}
              className={activeTable === table.name ? 'active compact' : 'compact'}
              type="button"
              onClick={() => setActiveTable(table.name)}
            >
              <Database size={16} />
              {table.label}
            </button>
          ))}
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p>Secure administrator area</p>
            <h1>Dashboard Overview</h1>
          </div>
          <div className="admin-account">
            <span>{user.name}</span>
            <button className="admin-secondary-btn" type="button" onClick={logout}>
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </header>

        <div className="admin-stats">
          <article>
            <BarChart3 size={22} />
            <span>Total revenue</span>
            <strong>{Number(stats?.revenue || 0).toLocaleString()} DH</strong>
          </article>
          {tables.slice(0, 5).map((table) => (
            <article key={table.name}>
              <Database size={22} />
              <span>{table.label}</span>
              <strong>{table.count}</strong>
            </article>
          ))}
        </div>

        <section className="admin-data-section">
          <div className="admin-table-header">
            <div>
              <p>{activeTableMeta?.label || formatLabel(activeTable)}</p>
              <h2>{meta.total} records</h2>
            </div>
            <div className="admin-table-actions">
              <button className="admin-secondary-btn" type="button" onClick={() => loadRows(meta.current_page)}>
                <RefreshCw size={17} />
                Refresh
              </button>
              <button className="admin-primary-btn" type="button" onClick={() => setModal({ mode: 'create' })}>
                <Plus size={17} />
                New record
              </button>
            </div>
          </div>

          <div className="admin-controls">
            <label className="admin-search">
              <Search size={18} />
              <input
                type="search"
                value={search}
                placeholder="Search records"
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <select value={filterColumn} onChange={(event) => setFilterColumn(event.target.value)}>
              <option value="">Filter column</option>
              {columns.map((column) => (
                <option key={column.name} value={column.name}>
                  {column.label}
                </option>
              ))}
            </select>
            <input
              value={filterValue}
              placeholder="Filter value"
              onChange={(event) => setFilterValue(event.target.value)}
            />
          </div>

          {notice && <div className="admin-success">{notice}</div>}

          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  {columns.slice(0, 8).map((column) => (
                    <th key={column.name}>
                      <button type="button" onClick={() => toggleSort(column.name)}>
                        {column.label}
                        {sort.sort_by === column.name ? (sort.sort_direction === 'asc' ? ' ↑' : ' ↓') : ''}
                      </button>
                    </th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    {columns.slice(0, 8).map((column) => (
                      <td key={column.name}>{compactValue(row[column.name])}</td>
                    ))}
                    <td className="admin-row-actions">
                      <button className="admin-icon-btn" type="button" onClick={() => setModal({ mode: 'view', row })} title="View">
                        <Eye size={17} />
                      </button>
                      <button className="admin-icon-btn" type="button" onClick={() => setModal({ mode: 'edit', row })} title="Edit">
                        <Edit3 size={17} />
                      </button>
                      <button className="admin-icon-btn danger" type="button" onClick={() => deleteRecord(row)} title="Delete">
                        <Trash2 size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
                {!rows.length && (
                  <tr>
                    <td colSpan={columns.length + 1} className="admin-empty">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="admin-pagination">
            <span>
              Page {meta.current_page} of {meta.last_page}
            </span>
            <div>
              <button
                className="admin-secondary-btn"
                type="button"
                disabled={meta.current_page <= 1}
                onClick={() => loadRows(meta.current_page - 1)}
              >
                <ChevronLeft size={17} />
                Previous
              </button>
              <button
                className="admin-secondary-btn"
                type="button"
                disabled={meta.current_page >= meta.last_page}
                onClick={() => loadRows(meta.current_page + 1)}
              >
                Next
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </section>
      </main>

      {modal && (
        <RecordModal
          mode={modal.mode}
          row={modal.row}
          columns={columns}
          onClose={() => setModal(null)}
          onSubmit={saveRecord}
        />
      )}
    </section>
  );
}

export default AdminDashboard;
