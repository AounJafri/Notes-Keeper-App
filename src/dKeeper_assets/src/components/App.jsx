import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dKeeper } from "../../../declarations/dKeeper/index";
import { useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {

    setNotes(prevNotes => {

      dKeeper.createNote(newNote.title , newNote.content);

      return [newNote,...prevNotes];
    });
  }

  useEffect(()=>{
    console.log("useEffect is triggered");
    fetchData();
  }, []);

  async function fetchData() {
    const notesArray = await dKeeper.readNotes();
    setNotes(notesArray);
  }

  function deleteNote(id) {
    
    dKeeper.removeNote(id);

    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });

    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />

      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
