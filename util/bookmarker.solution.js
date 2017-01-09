'use strict';

const shortid = require('shortid');
const jsonfile = require('jsonfile');
const validator = require('validator');

const bookmarker = {
  _bookmarks: jsonfile.readFileSync('db.json').bookmarks || [],
  // a function to sync the `_bookmarks` in this object with the ones
  // saved in the `db.json` file
  _updateDB: function(){
    return jsonfile.writeFileSync('db.json', {
      bookmarks: this._bookmarks
    });
  },
  all: function(){
    return this._bookmarks;
  },
  create: function(name, url){
    // check if inputs (parameters) are as expected
    const name_valid = name && !validator.isEmpty(name);
    const url_valid = url && validator.isURL(url);
    if(!name_valid || !url_valid){
      return false;
    }
    // create a new bookmark and add it to the list
    const new_bookmark = {
      id: shortid.generate(),
      url: url,
      name: name
    };
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
    // otherwise, item not found
    return null;
  },
  deleteById: function(id){
    const index = this.indexById(id);
    // if an index has been found
    if(index > -1){
      // remove the bookmark
      this._bookmarks = this._bookmarks.splice(index, 1);
      // update the database
      this._updateDB();
      return true;
    }
    // otherwise, bookmark not found
    return -1;
  },
  deleteAll: function(){
    this._bookmarks = [];
    this._updateDB();
  },
  count: function(){
    return this._bookmarks.length;
  }
};

/**
 * Export the object above to other files
 */
module.exports = bookmarker;
