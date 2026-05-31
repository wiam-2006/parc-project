<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MembershipPlan;

class MembershipPlanSeeder extends Seeder
{
    public function run(): void
    {
        MembershipPlan::truncate();

        $plans = [
            [
                'name'       => 'Basic',
                'price'      => '$29/month or $290/year',
                'features'   => [
                    'Access to 3 Adventure seekers',
                    'Weekday entry (Mon-Thu)',
                    'Basic hiking trails',
                    'Parking included',
                    'Newsletter & updates',
                ],
                'is_popular' => false,
                'btn_text'   => 'Join to park',
                'order'      => 1,
                'active'     => true,
            ],
            [
                'name'       => 'Premium',
                'price'      => '$79/month or $790/year',
                'features'   => [
                    'Unlimited 7-day access',
                    'Premium trails & activities',
                    'Priority parking & entry',
                    'Guided nature tours (2/month)',
                    'Eco-wellness programs',
                ],
                'is_popular' => true,
                'btn_text'   => 'Subscribe now',
                'order'      => 2,
                'active'     => true,
            ],
            [
                'name'       => 'VIP',
                'price'      => '$149/month or $1,490/year',
                'features'   => [
                    'All Premium benefits',
                    'Personal nature guide',
                    'Photography workshops',
                    'Concierge service',
                    'Annual retreat invitation',
                ],
                'is_popular' => false,
                'btn_text'   => 'Go VIP',
                'order'      => 3,
                'active'     => true,
            ],
        ];

        foreach ($plans as $plan) {
            MembershipPlan::create($plan);
        }
    }
}
