'use strict';

// require the needed npm packages
const prettyjson = require('prettyjson');
const parseArgs = require('minimist');

// require the bookmarksUtil and create a bookmarker
const createBookmarker = require('./util/bookmarker');
const bookmarker = createBookmarker();

// parse the command line arguments
const commands = parseArgs(process.argv);
const task = commands.task || commands.t;

// stop if the task hasn't been specified
if(!task){
	return console.log("\n Please enter a valid command using '--task [TASK_NAME]' \n");
}

// run the code that matches the task specified
switch(task){
	case 'list':
		console.log('\nHere is a list of all the current bookmarks:\n');
		console.log(bookmarker.findAll());
		console.log('\n');
		break;
	case 'new':
		const new_bookmark = bookmarker.create(commands.title, commands.url, commands.tags);
		console.log('\nSuccessfully create new bookmark. \n');
		console.log(new_bookmark);
		console.log('\n');
		break;
	case 'delete':
		try{
			bookmarker.deleteById(commands.id);
			console.log(`\nBookmark with id ${commands.id} has been deleted.\n`);
		}catch(err){
			console.log(`\n${err}\n`);
		}
		break;
	case 'delete_all':
		bookmarker.deleteAll();
		console.log('\nAll bookmarks have been deleted.\n');
		break;
	default:
		console.log('\n Command not found :( \n');
		break;
}