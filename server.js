/*****************************************************************************
 * server.js 
 *****************************************************************************
 * POC de backend para shurscript
 * Copyright (C) 2014 igtroop
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 *****************************************************************************
 * version 0.1
 *****************************************************************************/
 

// Cargamos las dependencias necesarias
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require("request")

// Sólo para propositos de depuración
var morgan     = require('morgan');

var app = express();

app.use(morgan('dev')); // Registramos peticiones a la consola
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("json spaces", 2);

// Puerto de escucha del servidor web
var port = process.env.PORT || 8080;

// URL para obtener las preferencias originales e importarlas
var url_migrate = "http://cloud.shurscript.org:8080/preferences/?apikey=";

// Conexión a mongo, BBDD 'shurscript'
mongoose.connect('mongodb://heroku_app32808268:tpire2tk9to8tvb83gdtlq968m@ds047930.mongolab.com:47930/heroku_app32808268');
//mongoose.connect('mongodb://localhost:27017/shurscript');

// Nuestro modelo
var ShurScript = require('./app/models/shurscript_settings');

// Creamos el router
var router = express.Router();

/*
 * Middleware a usar para todas nuestras peticiones
 * 1º Forzamos el charset
 * 2º Evitamos el aviso de CORS
 * 3º ?????
 * 4º PROFIT!
 */
router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header("Content-Type", "application/json; charset=utf-8");
	next();
});

/*
 * Ruta /migrate
 * Su función es obtener las preferencias del servidor original de shurscript
 * e importarlas en nuestra BBDD
 */
router.route('/migrate')

        // Leemos nuestra configuración original del cloud de shurscript y lo guardamos en nuestra BBDD
        .get(function(req, res) {
                        var apikey = req.param('apikey');

                        request({
                                url: url_migrate + apikey,
                                json: true
                        }, function (error, response, body) {
                                if (!error && response.statusCode === 200) {
										var shurscript = new ShurScript(body);
										shurscript.save(function(err) {
											if (err)
												res.send(err);
										});
                                }
                        })

                        res.json({ "ok": "Migrada configuración para apikey: " + apikey });
        });

/*
 * Ruta /config-master
 * Su función es obtener las preferencias generales del script
 * devolvemos una configuración estática por sencillez
 */
router.route('/config-master')

	.get(function(req, res) {
			res.json(
				{
					"web": "http://shurscript.org/",
					"fcThread": "https://github.com/TheBronx/shurscript/wiki/Oficial",
					"imagesURL": "http://static.shurscript.org/img/",
					"repositoryURL": "https://github.com/TheBronx/shurscript/",
					"updateURL": "http://static.shurscript.org/js/stable/0.288.0/shurscript.min.user.js",
					"installURL": "http://static.shurscript.org/js/stable/0.288.0/shurscript.min.user.js",
					"visualChangelog": "https://github.com/TheBronx/shurscript/blob/master/CHANGELOG.md",
					"visualFAQ": "https://github.com/TheBronx/shurscript/wiki/FAQ-(Indice)",
					"rawChangelog": "https://github.com/TheBronx/shurscript/raw/master/CHANGELOG.md",
					"imgurClientID": "e115ac41fea372d"
				}
			);
	});

/*
 * Ruta /preferences
 * Su función es obtener las preferencias del usuario según su apikey
 * devolvemos una configuración estática por sencillez
 */
router.route('/preferences')

	.get(function(req, res) {
		var apikey = req.param('apikey');
		ShurScript.findOne().where('apikey', apikey).exec(function(err, shurscript){
			if (err)
				res.send(err);
			res.json(shurscript);
		});		
	})

/*
 * Ruta /preferences/:setting
 * Su función es modificar las preferencias de los módulos del script
 * mediante una petición PUT
 */
router.route('/preferences/:setting')

	.put(function(req, res) {
		var apikey = req.param('apikey');
		ShurScript.findOne().where('apikey', apikey).exec(function(err, shurscript){
			if (err)
				res.send(err);

			shurscript[req.params.setting] = req.body.value;
			shurscript.save(function(err) {
				if (err)
					res.send(err);

				res.json({ "ok": "Preference updated" });
			});

		});
	})

// Usamos en nuestra app el router que hemos creado
app.use('/', router);

// Nos ponemos a la escucha en el puerto indicado
app.listen(port);

console.log('>> Iniciado servidor web en el puerto ' + port);
