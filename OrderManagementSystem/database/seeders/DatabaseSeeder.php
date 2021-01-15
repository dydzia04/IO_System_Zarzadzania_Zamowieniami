<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Status;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         $statuses = [
            ['id' => 1, 'name' => 'Zamówiono'],
            ['id' => 2, 'name' => 'W realizacji'],
            ['id' => 3, 'name' => 'Ukończono'],
            ['id' => 4, 'name' => 'Anulowano'],
        ];

        Status::insert($statuses);
    }
}
