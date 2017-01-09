'use strict';

const shortid = require('shortid');
const jsonfile = require('jsonfile');
const validator = require('validator');

const bookmarker = {
  // an array of bookmarks, initiated from the DB
  _bookmarks: jsonfile.readFileSync('db.json').bookmarks || [],
  // syncs the DB with the current list of bookmarks
  _syncDB: function(){
    return jsonfile.writeFileSync('db.json', {
      bookmarks: this._bookmarks
    });
  },
  // returns all bookmarks in the DB
  all: function(){
    return this._bookmarks;
  },
  // creates a new bookmark and returns it
  create: function(){

  },
  // returns a bookmark's index given its ID, -1 otherwise
  indexById: function(){

  },
  // returns a bookmark object given its ID, null otherwise
  findById: function(){

  },
  // deletes a bookmark given its ID
  deleteById: function(){

  },
  deleteAll: function(){
    this._bookmarks = [];
    this._syncDB();
  },
  count: function(){
    return this._bookmarks.length;
  }
};

/**
 * Export the object above to other files
 */
module.exports = bookmarker;
