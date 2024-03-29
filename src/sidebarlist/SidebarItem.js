import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './style';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';


const SidebarItem = ({_index, _note, classes, selectedNoteIndex, selectNote, deleteNote}) => {
const selectedNote = (n,i) => selectNote(n,i);

const deletedNote = (note) => {
    if(window.confirm(`Are you sure you want to delete: ${note.title}`)){
        deleteNote(note);
    }
}

    return (
        <div key={_index}>
            <ListItem 
                className={classes.listItem}
                selected={selectedNoteIndex === _index}
                alignItems='flex-start'>
            <div className={classes.textSection}
                onClick={()=> selectedNote(_note, _index)}>
                <ListItemText
                    primary={_note.title}
                    secondary={removeHTMLTags(_note.body.substring(0, 30))+'...'}></ListItemText>
            </div>
            <DeleteIcon 
                onClick={()=>deletedNote(_note)}
                className={classes.deleteIcon}
            ></DeleteIcon>
            </ListItem>
        </div>
    );
}

export default withStyles(styles) (SidebarItem);