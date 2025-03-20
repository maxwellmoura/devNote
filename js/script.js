//Elementos
const notesContainer = document.querySelector('#notes-container')
const noteInput = document.querySelector('#note-content')
const addNoteBtn = document.querySelector('.add-note')
//Funções
function showNotes() {
    clearNotes()
    getNotes().forEach(note => {
        const noteElement = createNote(note.id, note.content, note.fixed)
        notesContainer.appendChild(noteElement)
    })
}

function clearNotes() {
    notesContainer.replaceChildren([])
}


function addNote() {
    const notes = []
    const noteObject = {
        id: generateId(),
        content: noteInput.value,
        fixed: false,

    }
    const noteElement = createNote(noteObject.id, noteObject.content)
    notesContainer.appendChild(noteElement)
    notes.push(noteObject)
    
    noteInput.value = ''
    saveNotes(notes)
    
}
function generateId() {
    return Math.floor(Math.random() * 5000)
}
function createNote(id, content, fixed) {
    const element = document.createElement('div')
    element.classList.add('note')
    const textArea = document.createElement('textarea')
    textArea.value = content
    textArea.placeholder = 'Digite sua nota...'
    element.appendChild(textArea)
    if (fixed) {
        element.classList.add('fixed')
    }
    const pinIcon = document.createElement('i')
    pinIcon.classList.add(...["bi", "bi-pin"])
    element.appendChild(pinIcon)
   
      //Eventos do elmentos
      element.querySelector(".bi-pin").addEventListener('click', () => {
        toggleFixNote(id)
    })
    return element
  
}
function toggleFixNote(id) {
    const notes = getNotes()
    const targetNote = notes.filter((note) => note.id === id)[0]
    targetNote.fixed = !targetNote.fixed
    saveNotes(notes)
    
}
//Local Storage
function getNotes() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]')
    return notes
}
function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
}


//Eventos
addNoteBtn.addEventListener('click', () => addNote())

//Inicialização
showNotes()
// clearTimeout()