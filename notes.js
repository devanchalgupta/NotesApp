
var fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};



var addNote = (title, body) => {
    var notes = [];
    var note = {title, body};
    notes = fetchNotes();
    var dupNotes = notes.filter((note) => {
        return note.title === title;
    });

    if(dupNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAllNotes = () => {
    return fetchNotes();
};

var readNote = (title) => {
    var notes = fetchNotes();
    var filteredNote = notes.filter((note) => {
        return note.title === title;
    });
    return filteredNote[0];
};

var deleteNote = (title) => {
    var notes = fetchNotes();
    var notesNotContainingTitle = notes.filter((note) => {
        return note.title !== title;
    });
    if(notes.length !== notesNotContainingTitle.length) {
        saveNotes(notesNotContainingTitle);
        return true;
    } else {
        return false;
    }
    
};

var printNote = (note) => {
    console.log('----')
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
    console.log('----')
}

module.exports = {
    addNote, getAllNotes, readNote, deleteNote, printNote
}
