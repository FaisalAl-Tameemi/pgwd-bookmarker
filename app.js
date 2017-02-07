'use strict';

// require the bookmarksUtil and create a bookmarker
const bookmarker = require('./db');


bookmarker.removeAll();
bookmarker.create('test', 'http://google.com');
