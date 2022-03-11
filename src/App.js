import React,{useState,useEffect} from 'react'
import Note from './components/Note'
import notesService from './services/notesService'
import Notificacion from './components/Notificacion'
import Footer from './components/Footer'
import index from './index.css'

const App= ()=> {
  const [notes, setNote]=useState([])
  const [newNote, setNewNote] = useState(
    ''
  ) 
  const [showAll, setShowAll]=useState(true)
  const [errorMensaje, setErrorMensaje]=useState('some error happned...')
  //Utilizar useEffec
  //hook
  const hook=()=>{
    notesService
    .getAll()
    .then(inicialNote=>{
      setNote(inicialNote)
    })
  }
  useEffect(hook,[])
  //Función para agregar una nueva nota
  const AddNote=(event)=>{
    event.preventDefault()
    const noteObjetc={
      content : newNote,
      date : new Date().toISOString(),
      important : Math.random()<.5,
    }
    notesService
    .create(noteObjetc)
    .then(returNote=>{
      setNote(notes.concat(returNote))
      setNewNote('')
    })
  }
  //Observar lo cambios del input
  const handleNoteChange=(event)=>{
    setNewNote(event.target.value)
  }
  const toggleImportanceOf=(id)=>{
    const note = notes.find(n=>n.id===id)
    const changeNote={...note, important : !note.important}
    notesService
    .update(id,changeNote)
    .then(returnNote=>setNote(notes.map(note=>note.id!==id ? note : returnNote)))
    .catch(error=>{
      setErrorMensaje(
        `Note '${note.content}' was already deleted from server`
      )
      setTimeout(()=>{
        setErrorMensaje(null)
      },5000)
      setNote(notes.filter(nota=>nota.id!==id))
    })
  }
  const notesToShow = showAll ? notes : notes.filter(note=>note.important)
  return (
    <div>
      <h1>Notes</h1>
      <Notificacion mensaje={errorMensaje} />
      <div>
      <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note=><Note key={note.id} note={note} 
        toggleImportance={()=>toggleImportanceOf(note.id)}
        />)}
      </ul>
      <form onSubmit={AddNote}>
          <input value={newNote} 
          onChange={handleNoteChange} placeholder='typing note...' />
          <button type='submit' > save </button>
      </form>
      <Footer/>
    </div>
  );
}

export default App;
