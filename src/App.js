import React, { useEffect, useState } from 'react';
import './App.css';
import projectFirestore from './config';
import firebase from 'firebase/app';
import Editor from './editor/Editor';
import SideBar from './sidebar/Sidebar';

function App() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState(null);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);

  useEffect(()=>{
    projectFirestore
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        setNotes(notes);
      })
  },[])

  const selectNote = (note, index) => {
    setSelectedNote(note);
    setSelectedNoteIndex(index);
  }

  const noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  const deleteNote = async(note) => {
    const noteIndex = notes.indexOf(note);
    await setNotes(notes.filter(_note => _note !== note));
    if(selectedNoteIndex === noteIndex) {
       setSelectedNoteIndex(null);
       setSelectedNote(null);
    } else {
      notes.length > 1 ?
      selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex - 1) : 
       setSelectedNoteIndex(null);
       setSelectedNote(null);
    }
      firebase.firestore().collection('notes').doc(note.id).delete();
  }

  const newNote = async(title) => {
    const note = {
      title: title,
      body: ''
  };
     
  const newFromDB = await firebase.firestore().collection('notes').add({
    title: note.title,
    body: note.body,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
    const newID = newFromDB.id;
    await setNotes({ notes: [...notes, note] });
    const newNoteIndex = notes.indexOf(notes.filter(_note => _note.id === newID)[0]);
    setSelectedNote(notes[newNoteIndex]);
    setSelectedNoteIndex(newNoteIndex);
  }

  return (
    <div className="App">
      <SideBar 
        selectedNoteIndex = {selectedNoteIndex}
        notes = {notes}
        deleteNote={deleteNote}
        selectNote = {selectNote}
        newNote={newNote}
      />
      {
        selectedNote ? 
          <Editor 
            key = {selectedNoteIndex}
            selectedNote={selectedNote}
            selectedNoteIndex={selectedNoteIndex}
            notes = {notes}
            noteUpdate = {noteUpdate} 
          /> : null
      }
    </div>
  );
}

export default App;
