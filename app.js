
var fs = require('fs');
var _ = require('lodash');
var yargs = require('yargs');
var notes = require('./notes.js');

var titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}

var bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}

var argv = yargs
.command('add', 'Add new note', {title: titleOptions, body: bodyOptions})
.command('list', 'List all notes')
.command('read', 'Read note', {title: titleOptions})
.command('delete', 'Delete note', {title: titleOptions})
.help()
.argv;

var command = argv._[0];
if(command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if(note) {
        notes.printNote(note);
    } else {
        console.log("Note with same title already exists");        
    }
} else if(command === 'list') {
    var allNotes = notes.getAllNotes();
    allNotes.forEach((note) => {
        notes.printNote(note);
    }, this);

} else if(command === 'read') {
    var note = notes.readNote(argv.title);
    if(note) {
        notes.printNote(note);
    } else {
        console.log('Note not found');
    }
} else if(command === 'delete') {
    var result = notes.deleteNote(argv.title);
    if(result) {
        console.log('Note removed');
    } else {
        console.log('Note not removed');
    }
} else {
    console.log('invalid command')
}