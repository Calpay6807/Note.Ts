import NoteForm from "../note-form";
import { NoteData, Tag } from "../types";

export type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  addTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;
const NewNote = ({ onSubmit, addTag, availableTags }: NewNoteProps) => {
  return (
    <div>
      <h1 className="mb-4">Yeni Not Ekle</h1>
      <NoteForm
        onSubmit={onSubmit}
        addTag={addTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default NewNote;
