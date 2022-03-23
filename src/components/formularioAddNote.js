import React, { useState } from "react";

const FormularioAddNote = ({
    AddNote,
    newNota
    , handleNoteChange }) => {
    const [neweNote, setNewNote] = useState('')
    
    return (
        <form onSubmit={AddNote} >
            <input
                value={newNota}
                type='text'
                onChange={handleNoteChange}
            />
            <button type="submit" >save</button>
        </form>
    )
}
export default FormularioAddNote