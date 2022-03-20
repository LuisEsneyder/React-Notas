import React from "react";

const FormularioAddNote = ({AddNote,newNota,handleNoteChange})=>{
    return(
        <form onSubmit={AddNote} >
            <input
            value={newNota}
            type='text'
            onChange={handleNoteChange}
            />
            <button type="submit" >Add note</button>
        </form>
    )
}
export default FormularioAddNote