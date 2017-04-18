<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('master');
});
Route::post('auth','UserController@checkAuth');
Route::resource('user','UserController');
Route::resource('gallery','GalleryController');

Route::post('upload-file','GalleryController@uploadImage');
Route::get('test',function (){
   return print_r(public_path());
});