const assert = require('chai').assert;
const bookmarker = require('../util/bookmarker.solution');

describe('Bookmarker', function() {

  describe('#all()', function() {
    it('should return an array of bookmarks in the DB', function() {
      const data = bookmarker.all();
      assert.equal(true, data.hasOwnProperty('length'));
    });
  });

  describe('#deleteAll()', function() {
    it('should remove all the bookmarks available in the DB', function(){
      bookmarker.deleteAll();
      assert.equal(0, bookmarker.all().length);
    });
  });

  describe('#count()', function() {
    it('should return the number of total available bookmarks in the DB', function(){
      bookmarker.deleteAll();
      assert.equal(0, bookmarker.all().length);
    });
  });

  describe('#create()', function() {
    describe('can recieve a `name` and a `url` as arguments', function(){
      it('should return the newly created bookmark', function(){
        const new_bookmark = bookmarker.create('testing', 'http://example.com');
        assert.equal(new_bookmark.name, 'testing');
        assert.equal(new_bookmark.url, 'http://example.com');
      });

      it('should validate that `name` is not empty & return false otherwise', function(){
        const new_bookmark = bookmarker.create('', 'http://example.com');
        assert.equal(new_bookmark, false);
      });

      it('should validate that `url` is a valid link & return false otherwise', function(){
        const new_bookmark = bookmarker.create('test', 'not_a_url', ['example', 'tag_2']);
        assert.equal(new_bookmark, false);
      });
    });
  });

  describe('#indexById()', function() {
    it('should return the index of an item given its `id` as an argument', function(){
      const bookmark = bookmarker.create('Google', 'http://google.com');
      const index = bookmarker.indexById(bookmark.id);
      assert.equal(index, bookmarker.count() - 1);
    });

    it('should return -1 if the bookmark index is not found', function(){
      const index = bookmarker.indexById('not_a_real_id');
      assert.equal(index, -1);
    });
  });

  describe('#findById()', function() {
    it('should return the bookmark of the object given its `id`', function(){
      const bookmark = bookmarker.create('Google', 'http://google.com');
      const found = bookmarker.findById(bookmark.id);
      assert.equal('Google', found.name);
    });

    it('should return null if the bookmark is not found', function(){
      const found = bookmarker.findById('not_a_real_id');
      assert.equal(null, found);
    });
  });

  describe('#deleteById()', function() {
    it('should delete a bookmark from the DB given its `id` as an argument', function(){
      const bookmark = bookmarker.create('Amazon', 'http://amazon.ca');
      bookmarker.deleteById(bookmark.id);
      // wait for DB to be updated
      setTimeout(function(){
        // then check that item can no longer be found
        assert.equal(-1, bookmarker.indexById(bookmark.id));
      }, 0);
    });
  });

  describe('#deleteAll()', function() {
    it('Should remove all bookmarks within the DB', function(){
      bookmarker.deleteAll();
      // wait for DB to be updated
      setTimeout(function(){
        // then check that item can no longer be found
        assert.equal(0, bookmarker.count());
      }, 0);
    });
  });

  // HOOKS
  after('Remove all test bookmarks from the DB', function() {
    bookmarker.deleteAll();
  });

});
