'use strict';

const storageInMemory = [];

class Note {
    constructor(props) {
        this.name = props.name;
        this.text = props.text;
    }

    save() {
        storageInMemory.push(this);
    }

    static find(name) {
        return storageInMemory
            .filter(note => note.name === name)
            .pop();
    }

    static findAll() {
        return storageInMemory;
    }
}

storageInMemory.push(
    new Note({
        name: 'Films',
        text: 'Films to watch'
    })
);

storageInMemory.push(
    new Note({
        name: 'Books',
        text: 'Books to read'
    })
);

module.exports = Note;
