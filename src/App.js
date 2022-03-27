import React, { useState, useEffect,useRef } from 'react'
import Note from './components/Note'
import notesService from './services/notesService'
import Notificacion from './components/Notificacion'
import Footer from './components/Footer'
import index from './index.css'
import loginServices from './services/loginServices'
import FOrmularioLogin from './components/FormularioLoging'
import FormularioAddNote from './components/formularioAddNote'
import Toggable from './components/Togglable'

const App = () => {
  const [notes, setNote] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMensaje, setErrorMensaje] = useState(null)
  const [User, setUser] = useState(null)
  //Utilizar useEffec
  useEffect(() => {
    notesService
      .getAll()
      .then(inicialNote => {
        setNote(inicialNote)
      })
  }, [])
  //Función para agregar una nueva nota
  const AddNote = (noteObjetc) => {
    noteFormRef.current.toggleVisibility()
    notesService
      .create(noteObjetc)
      .then(returNote => {
        setNote(notes.concat(returNote))
      })
  }
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      notesService.setToken(user.token)
    }
  }, [])
  //Observar lo cambios del input
  const handleLogin = async (loginObjet) => {
    try {
      const user = await loginServices.login(loginObjet)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      notesService.setToken(user.token)
      setUser(user)
    } catch (exeption) {
      setErrorMensaje('Wrong credentials')
      setTimeout(() => {
        setErrorMensaje(null)
      }, 6000)
    }
  }
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changeNote = { ...note, important: !note.important }
    notesService
      .update(id, changeNote)
      .then(returnNote => setNote(notes.map(note => note.id !== id ? note : returnNote)))
      .catch(error => {
        setErrorMensaje(
          `Note '${note.content}' was already deleted from server`
        )
        setTimeout(() => {
          setErrorMensaje(null)
        }, 5000)
        setNote(notes.filter(nota => nota.id !== id))
      })
  }
  const cerrarSesion = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }
  const noteFormRef= useRef()
  
  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  return (
    <div>
      <h1>Notes</h1>
      <Notificacion mensaje={errorMensaje} />
      <div>
        {User === null ?
          <Toggable buttonLabel='login'>
            <FOrmularioLogin
              handleLogin={handleLogin}
            />
          </Toggable> :
          <Toggable buttonLabel="new note" ref={noteFormRef}>
            {User.name} loging <button onClick={() => cerrarSesion()} > logout</button>
            <FormularioAddNote
              createNote={AddNote} />
          </Toggable>
        }

        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}
        />)}
      </ul>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
