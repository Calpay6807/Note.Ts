import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./Layout";
import { Link } from "react-router-dom";
import ReactMarkDown from "react-markdown";

type DetailProps = {
  onDeleteNote: (id: string) => void;
};
const NoteDetail = ({ onDeleteNote }: DetailProps) => {
  const note = useNote();
  console.log("notes", note);
  return (
    <>
      <Row>
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack direction="horizontal" gap={1} className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge>{tag.label}</Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col>
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button>Düzenle</Button>
            </Link>
            <Button
              onClick={() => onDeleteNote(note.id)}
              variant="outline-danger"
            >
              Sil
            </Button>
            <Link to={`/`}>
              <Button variant="outline-secondary">Geri</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkDown>{note.markdown}</ReactMarkDown>
    </>
  );
};

export default NoteDetail;
