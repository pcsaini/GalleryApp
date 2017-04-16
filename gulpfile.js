/**
 * Created by pcsaini on 16/4/17.
 */
var elixir = require('laravel-elixir');

elixir(function (mix) {
    mix.scripts([
        'app.js'
    ],'public/js/app.js');

    mix.scripts([
        'controller/userController.js'
    ],'public/js/controller.js');
});