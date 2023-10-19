import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./form/new-note";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { NoteData, RawNote, Tag } from "./form/types";
import { useLocalStorage } from "./use-local-storage";
import { v4 } from "uuid";
import { useMemo } from "react";
import MainPage from "./components/main-page";
import Layout from "./components/main-page/note-detail/Layout";
import NoteDetail from "./components/main-page/note-detail";
import EditNote from "./components/main-page/note-detail/EditNote";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

  // notalaeın etiketlerin id değertleriyle
  // eşleşen etiketleri al hesaplamayı performans chacle
  const noteWithTags = useMemo(() => {
    return notes.map((note) => ({
      ...note,
      tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
    }));
  }, [notes, tags]);
  console.log(noteWithTags);
  //locale yeni note ekler
  function onCreateNote({ tags, ...data }: NoteData) {
    console.log("selam");
    setNotes((prev) => {
      return [
        ...prev,
        { ...data, id: v4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  // locale yeni etiket ekler
  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  // elemanı siler

  function onDeleteNote(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((n) => n.id !== id);
    });
  }

  //elemanı gğnceller
  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prev) => {
      return prev.map((n) => {
        // dizideki elema güncellenicek note ise
        // bütün değrlerini değiştir
        if (n.id === id) {
          return {
            ...n,
            ...data,
            tagIds: tags.map((tag) => tag.id),
          };
        } else {
          return n;
        }
      });
    });
  }
  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={<MainPage notes={noteWithTags} availableTags={tags} />}
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              addTag={addTag}
              availableTags={tags}
            />
          }
        />

        <Route path="/:id" element={<Layout notes={noteWithTags} />}>
          <Route index element={<NoteDetail onDeleteNote={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>

        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Container>
  );
}

export default App;
