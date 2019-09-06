<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
        	[
            	'email' => 'admin@email.com',
            	'employee_id' => 0,
            	'password' => bcrypt('admin123'),
        	],
        	[
        		'email' => 'employee@email.com',
        		'employee_id' => 1,
            	'password' => bcrypt('employee123'),
        	]
        ]);
    }
}
