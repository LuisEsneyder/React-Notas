import React,{useState,useEffect} from 'react'
import Note from './components/Note'
import notesService from './services/notesService'
import Notificacion from './components/Notificacion'
import Footer from './components/Footer'
import index from './index.css'
import loginServices from './services/loginServices'
import FOrmularioLogin from './components/FormularioLoging'
import FormularioAddNote from './components/formularioAddNote'

const App= ()=> {
  const [notes, setNote]=useState([])
  const [newNote, setNewNote] = useState(
    ''
  ) 
  const [showAll, setShowAll]=useState(true)
  const [errorMensaje, setErrorMensaje]=useState(null)
  const [username,setusername]=useState('')
  const [passwordHas,setPassword]=useState('')
  const [User,setUser]=useState(null)
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
  useEffect(()=>{
    const loggedUserJSON=window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      notesService.setToken(user.token)
    }
  },[])
  //Observar lo cambios del input
  const handleUsername=(event)=>{
    setusername(event.target.value)
  }
  const handlePassword = (event)=>{
    setPassword(event.target.value)
  }
  const handleLogin =async (event)=>{
    event.preventDefault()
    try {
      const user = await loginServices.login({
        username,passwordHas
      })
      window.localStorage.setItem('loggedNoteappUser',JSON.stringify(user))
      notesService.setToken(user.token)
      setUser(user)
      setusername('')
      setPassword('')
    } catch (exeption) {
      setErrorMensaje('Wrong credentials')
      setTimeout(()=>{
        setErrorMensaje(null)
      },6000)
    }
  }
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
        {User == null && <FOrmularioLogin handleLogin={handleLogin} handlePassword={handlePassword} handleUsername={handleUsername} passwordHas={passwordHas} username={username} />}
        {User !=null && <div>
          <p>{User.name} logged-in</p>
          <FormularioAddNote AddNote={AddNote} newNota={newNote} handleNoteChange={handleNoteChange}/>
        </div>
        }
      <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note=><Note key={note.id} note={note} 
        toggleImportance={()=>toggleImportanceOf(note.id)}
        />)}
      </ul>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
