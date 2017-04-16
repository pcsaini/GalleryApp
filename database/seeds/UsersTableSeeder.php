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
        App\User::create([
            'name' => 'Prem Chand Saini',
            'email'=> 'premchandsaini779@gmail.com',
            'password' => \Hash::make('pcsaini.'),
        ]);
    }
}
