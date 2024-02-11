import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notes")
      .then((response) => setNotes(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    setNewNote({
      ...newNote,
      [e.target.name]: e.target.value,
    });
  };

  const addNote = () => {

    if (newNote.title && newNote.content) {
      axios
        .post("http://localhost:5000/api/notes", newNote)
        .then((response) => {
          setNotes([...notes, response.data]);
          setNewNote({ title: "", content: "" });
        })
        .catch((error) => console.error(error));
    } 
  };

  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:5000/api/notes/${id}`)
      .then(() => {
        setNotes(notes.filter((note) => note._id !== id));
      })
      .catch((error) => console.error(error));
  };



  return (
    <div id="note">
      <h1>Not Defteri</h1>
      <div>
        <input
          placeholder="Başlık"
          name="title"
          value={newNote.title}
          onChange={handleInputChange}
        />
        <input
          placeholder="İçerik"
          name="content"
          value={newNote.content}
          onChange={handleInputChange}
        ></input>

        <button className="btn btn-primary" onClick={addNote}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note._id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
