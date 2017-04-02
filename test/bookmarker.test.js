const assert = require('chai').assert;
const lowdb = require('lowdb');
const bookmarker = require('../db');

const db = lowdb(`${__dirname}/../db/database.json`);

// reset the bookmarks list to an array
db.set('bookmarks', []).value();

describe('Bookmarker', function() {

  describe('#all()', function() {
    it('should return an array of bookmarks in the DB', function() {
      const data = bookmarker.all();
      assert.equal(true, data.hasOwnProperty('length'));
    });
  });

  describe('#count()', function() {
    it('should return the number of total available bookmarks in the DB', function(){
      bookmarker.removeAll();
      assert.equal(0, bookmarker.all().length);
    });
  });

  describe('#create()', function() {
    describe('can recieve a `title` and a `url` as arguments', function(){
      it('should return the newly created bookmark', function(){
        const new_bookmark = bookmarker.create('testing', 'http://example.com');
        assert.equal(new_bookmark.title, 'testing');
        assert.equal(new_bookmark.url, 'http://example.com');
      });
    });
  });

  describe('#find()', function() {
    it('should return the bookmark of the object given its `id`', function(){
      const bookmark = bookmarker.create('Google', 'http://google.com');

      if (!bookmark) {
        throw new Error("Failed to create a bookmark before finding it");
      }

      const found = bookmarker.find(bookmark.id);
      assert.equal('Google', found.title);
    });

    it('should return null if the bookmark is not found', function(){
      const found = bookmarker.find('not_a_real_id');
      assert.equal(-1, found);
    });
  });

  describe('#remove()', function() {
    it('should delete a bookmark from the DB given its `id` as an argument', function(){
      const bookmark = bookmarker.create('Amazon', 'http://amazon.ca');

      if (!bookmark) {
        throw new Error("Failed to create a bookmark before removing it");
      }

      bookmarker.remove(bookmark.id);
      // wait for DB to be updated
      setTimeout(function(){
        // then check that item can no longer be found
        assert.equal(null, bookmarker.find(bookmark.id));
      }, 0);
    });
  });

  describe('#removeAll()', function() {
    it('Should remove all bookmarks within the DB', function(){
      const bookmark = bookmarker.create('Another One', 'http://example.com');

      if (!bookmark) {
        throw new Error("Failed to create a bookmark before removing all");
      }

      bookmarker.removeAll();
      // wait for DB to be updated
      setTimeout(function(){
        // then check that item can no longer be found
        assert.equal(0, bookmarker.count());
      }, 0);
    });
  });

  // HOOKS
  after('Remove all test bookmarks from the DB', function() {
    bookmarker.removeAll();
  });

});
