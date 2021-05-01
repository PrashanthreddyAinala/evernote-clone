import React, {useState, useEffect} from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './Style';

const Editor= ({selectedNote, classes, noteUpdate}) => {

      const [text, setText] = useState('');
      const [title, setTitle] = useState(selectedNote.title);
      const [id, setId] = useState(selectedNote.id);

    useEffect(()=>{
        setText(selectedNote.body);
        setTitle(selectedNote.title);
        setId(selectedNote.id);
    },[])

    const updateBody = (val) => {
        noteUpdate(id, {
            title: title,
            body: val
        });
        setText(val);
    };
        
    const debounce = (func, delay) => {
        let timer;
    
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(null, args), delay);
        };
    };

    useEffect(()=>{
        if(selectedNote.id !== id) {
            setText(selectedNote.body);
            setTitle(selectedNote.title);
            setId(selectedNote.id);
        }
    },[])

    const updateTitle = async(txt) => {
        await setTitle(txt)
    }

    return(
        <div className={classes.editorContainer}>
            <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
            <input 
                className={classes.titleInput} 
                placeholder='Note title....' 
                value={title ? title : ''} 
                onChange={(e) => updateTitle(e.target.value)}
            />
            <ReactQuill
                value = {text}
                onChange={debounce(updateBody, 1500)}>
            </ReactQuill>
        </div>
      );
}

export default withStyles(styles) (Editor) ;