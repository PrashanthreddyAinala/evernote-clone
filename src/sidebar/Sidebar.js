import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './Style';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebarlist/SidebarItem';

const SideBar = ({notes, classes, selectedNoteIndex, newNote, selectNote, deleteNote}) => {
      const [addingNote, setAddingNote] = useState(false);
      const [title, setTitle] = useState(null);

    const newNoteBtnClick = () => {
        setAddingNote (!(addingNote));
        setTitle (null);
    }

    const updateTitle = (txt) => {
        setTitle(txt);
    }

    const addnewNote = () => {
        newNote(title);
        setTitle(null);
        setAddingNote(false);
    }
    const selectNotes = (n, i) => selectNote(n, i);
    const deleteNotes = (note) => deleteNote(note);

    if(notes){
        return (
            <div className={classes.sidebarContainer}>
                <Button 
                    onClick={newNoteBtnClick}
                    className={classes.newNoteBtn}>{addingNote ? 'Cancel' : 'New Note'}
                </Button>
                {
                    addingNote ? 
                    <div>
                        <input type = 'text'
                            className = {classes.newNoteInput}
                            placeholder = 'Enter note title'
                            onKeyUp={(e)=>updateTitle(e.target.value)}
                            required
                        />
                        <Button
                            className={classes.newNoteSubmitBtn}
                            onClick={addnewNote}>
                                Submit Note
                        </Button>
                    </div> : null
                }
                <List>
                    {Array.isArray(notes) &&
                        notes.map((_note,_index) => {
                            return(
                                <div key={_index}>
                                    <SidebarItemComponent
                                    _note={_note}
                                    _index={_index}
                                    selectedNoteIndex={selectedNoteIndex}
                                    selectNote={selectNotes}
                                    deleteNote={deleteNotes}>

                                    </SidebarItemComponent>
                                    <Divider></Divider>
                                </div>
                            )
                        })
                    }
                </List>
            </div>
      );
    } else {
        return(
            <div></div>
        );
     }
}

export default withStyles(styles)(SideBar);