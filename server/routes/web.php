<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

// $router->get('/', function () use ($router) {
//     return $router->app->version();
// });

$router->group(['prefix' => 'api', 'middleware' =>  'auth:api'], function () use ($router) {
    // $router->get('notes', 'Notes\NotesController@index');
    $router->get('notes', 'Notes\NotesController@getUserNotes');
    $router->post('notes', 'Notes\NotesController@store');
    $router->put('notes/{id}', 'Notes\NotesController@update');
    $router->delete('notes/{id}', 'Notes\NotesController@destroy');


    // $router->post('auth/login', 'AuthController@login');
    
});

$router->post('signup', 'AuthController@signUp');
$router->post('login', 'AuthController@login');

// $router->options('{any:.*}', function () {
//     return response('', 200);
// });  