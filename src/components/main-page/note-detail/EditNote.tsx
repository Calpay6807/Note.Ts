import NoteForm from "../../../form/note-form";
import { NoteData, Tag } from "../../../form/types";
import { useNote } from "./Layout";

type UpdateNote = {
  onSubmit: (id: string, data: NoteData) => void;
  availableTags: Tag[];
  onAddTag: (tag: Tag) => void;
};

const EditNote = ({ onSubmit, onAddTag, availableTags }: UpdateNote) => {
  const note = useNote();
  return (
    <div>
      <h1>Notu Düzenle</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        availableTags={availableTags}
        onAddTag={onAddTag}
      />
    </div>
  );
};

export default EditNote;
