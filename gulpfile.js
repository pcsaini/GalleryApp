/**
 * Created by pcsaini on 16/4/17.
 */
var elixir = require('laravel-elixir');

elixir(function (mix) {
    mix.scripts([
        'app.js'
    ],'public/js/app.js');

    mix.scripts([
        'controller/userController.js',
        'controller/globalController.js',
        'controller/navController.js',
        'controller/galleryController.js'
    ],'public/js/controller.js');

    mix.scripts([
        'models/userModel.js',
        'models/galleryModel.js'
    ],'public/js/models.js');

    mix.version([
        'js/app.js',
        'js/controller.js',
        'js/models.js'
    ])
});