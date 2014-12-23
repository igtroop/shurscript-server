/*****************************************************************************
 * app/models/shurscript_settings.js
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

// Cargamos dependencias necesarias
var mongoose     = require('mongoose');

// Creamos el esquema con los datos de cada usuario
var Schema       = mongoose.Schema;

var ShurScriptSchema   = new Schema({
	SHURSCRIPT_Announces_READ_ANNOUNCES:		String,
	SHURSCRIPT_AutoIcons_MOST_USED_ICONS:		String,
	SHURSCRIPT_AutoIcons___preferences:			String,
	SHURSCRIPT_AutoSpoiler___preferences:		String,
	SHURSCRIPT_BetterPosts_POST_BACKUP:			String,
	SHURSCRIPT_BetterPosts___preferences:		String,
	SHURSCRIPT_BottomNavigation___preferences:	String,
	SHURSCRIPT_FilterThreads_FAVORITES:			String,
	SHURSCRIPT_FilterThreads_HIDDEN_THREADS:	String,
	SHURSCRIPT_FilterThreads___preferences:		String,
	SHURSCRIPT_HighlightOP___preferences:		String,
	SHURSCRIPT_History_OPENED_THREADS:			String,
	SHURSCRIPT_History_READ_THREADS:			String,
	SHURSCRIPT_History_SENT_POSTS:				String,
	SHURSCRIPT_History___preferences:			String,
	SHURSCRIPT_ImageGallery___preferences:		String,
	SHURSCRIPT_ImageUploader___preferences:		String,
	SHURSCRIPT_Integrations___preferences:		String,
	SHURSCRIPT_NestedQuotes___preferences:		String,
	SHURSCRIPT_PrivateMode___preferences:		String,
	SHURSCRIPT_Quotes_LAST_QUOTES:				String,
	SHURSCRIPT_Quotes_LAST_QUOTES_UPDATE:		String,
	SHURSCRIPT_Quotes_LAST_READ_QUOTE:			String,
	SHURSCRIPT_Quotes___preferences:			String,
	SHURSCRIPT_Reader___preferences:			String,
	SHURSCRIPT_Reader_BOOKMARKS:				String,
	SHURSCRIPT_RefreshSearch___preferences:		String,
	SHURSCRIPT_Scrollers___preferences:			String,
	SHURSCRIPT_ThreadUpdater___preferences:		String,
	SHURSCRIPT_Webm___preferences:				String,
	SHURSCRIPT_moduleManager_MIGRATION_DONE:	String,
	SHURSCRIPT_notifications_NOTIFICATIONS:		String,
	apikey:		String
});

module.exports = mongoose.model('shurscript_settings', ShurScriptSchema);
