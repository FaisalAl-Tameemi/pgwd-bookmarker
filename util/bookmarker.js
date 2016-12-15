'use strict';

const shortid = require('shortid');
const jsonfile = require('jsonfile');
const validator = require('validator');

/**
 * [createBookmarker Create a bookmarks utility object that saves data into a file]
 * @return {[object]} [A bookmarks utility object instance]
 */
const createBookmarker = function(){
	return {
		_bookmarks: jsonfile.readFileSync('db.json').bookmarks || [],
		_updateDB: function(){
			return jsonfile.writeFileSync('db.json', {
				bookmarks: this._bookmarks
			});
		},
		findAll: function(){
			return this._bookmarks;
		},
		create: function(name, url, tags){
			// check if inputs (parameters) are as expected
			const name_valid = name != null && !validator.isEmpty(name);
			const url_valid = url != null && !validator.isURL(name);
			// create a new bookmark and add it to the list
			const new_bookmark = {
				id: shortid.generate(),
				url: url,
				name: name
			};
			// tags are optional, check if they have been provided
			if(tags && typeof tags === 'string'){
				new_bookmark['tags'] = tags.split(',').map(function(elm){
					return elm.trim();
				});
			}
			// add the bookmark to the database
			this._bookmarks.push(new_bookmark);
			this._updateDB();
			return new_bookmark;
		},
		indexById: function(id){
			for(let i = 0; i < this._bookmarks.length; i++){
				// if the current bookmark's id matches the one we're looking for
				if(this._bookmarks[i].id === id){
					// return it
					return i;
				}
			}
			// otherwise, item not found
			return -1;
		},
		findById: function(id){
			const index = this.indexById(id);
			if(index > -1){
				return this._bookmarks[index];
			}
			thorw `Bookmark not found for id ${id}`;
		},
		deleteById: function(id){
			const index = this.indexById(id);
			// if an index has been found
			if(index > -1){
				// remove the bookmark
				this._bookmarks = this._bookmarks.splice(index, 1);
				// update the database
				this._updateDB();
				return this.count();
			}
			throw new Error(`id ${id} not found`);
		},
		deleteAll: function(){
			this._bookmarks = [];
			this._updateDB();
		},
		count: function(){
			return this._bookmarks.length;
		}
	};
}

/**
 * Export the object above to other files
 */
module.exports = createBookmarker;
