'use strict';

const shortid = require('shortid');
const lowdb = require('lowdb');

const db = lowdb(`${__dirname}/database.json`);

// If the bookmarks list does not exist in the database files
// then set its default value to an empty array
if (!db.has('bookmarks').value()) {
  db.set('bookmarks', []).value();
};

const bookmarker = {
  // returns all bookmarks in the DB
  all: function(){
    return db.get('bookmarks').value();
  },
  count: function(){
    return this.all().length;
  }
  // creates a new bookmark and returns it
  create: function(name, url){

  },
  // returns a bookmark object given its ID, null otherwise
  find: function(id){

  },
  // deletes a bookmark given its ID
  remove: function(id){

  },
  // remove all bookmarks from the database
  removeAll: function(){

  }
};

// Export the object above to other files
module.exports = bookmarker;
