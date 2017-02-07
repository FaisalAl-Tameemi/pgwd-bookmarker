'use strict';

const shortid = require('shortid');
const lowdb = require('lowdb');

const db = lowdb(`${__dirname}/database.json`);

if (!db.has('bookmarks').value()) {
  db.set('bookmarks', []).value();
};

const bookmarker = {
  // returns all bookmarks in the DB
  all: function(){
    return db.get('bookmarks').value();
  },
  // creates a new bookmark and returns it
  create: function(name, url){
    const unique_id = shortid.generate();
    return db
      .get('bookmarks')
      .push({
        id: unique_id,
        name: name,
        url: url
      })
      .find({
        id: unique_id
      })
      .value();
  },
  // returns a bookmark object given its ID, null otherwise
  find: function(id){
    return db.get('bookmarks').find({ id }).value();
  },
  // deletes a bookmark given its ID
  remove: function(id){
    return db.get('bookmarks').remove({ id }).value();
  },
  removeAll: function(){
    db.set('bookmarks', []).value();
  },
  count: function(){
    return this.all().length;
  }
};

/**
 * Export the object above to other files
 */
module.exports = bookmarker;
