import React, { useState } from "react";

const FormularioAddNote = ({
    createNote}) => {
    const [newNote, setNewNote] = useState('')
    const handleNoteChange = (event)=>{
        setNewNote(event.target.value)
    }
    const addNote = (event)=>{
        event.preventDefault()
         createNote({
            content : newNote,
            important : Math.random() < .5,
            date : new Date().toString()
        }) 
        setNewNote('')
    }
    return (
        <form onSubmit={addNote} >
            <input
                value={newNote}
                type='text'
                onChange={handleNoteChange}
            />
            <button type="submit" >save</button>
        </form>
    )
}
export default FormularioAddNote