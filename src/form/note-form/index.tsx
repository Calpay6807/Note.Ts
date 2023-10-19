import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import ReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../types";
import { NewNoteProps } from "../new-note";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
};
const NoteForm = ({
  onSubmit,
  addTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NewNoteProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate(-1);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Başlık</Form.Label>
              <Form.Control
                ref={titleRef}
                required
                className="shadow"
                defaultValue={title}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Etiketler</Form.Label>
              <ReactSelect
                // sahip olucağı etiketler
                value={selectedTags.map((etiket) => ({
                  label: etiket.label,
                  value: etiket.id,
                }))}
                // onchange
                onChange={(tags) =>
                  setSelectedTags(
                    tags.map((etiket) => ({
                      label: etiket.label,
                      id: etiket.value,
                    }))
                  )
                }
                // yeni etiket oluşturulduğunda
                onCreateOption={(label) => {
                  const newTag: Tag = { id: v4(), label };
                  addTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                // daha önceden eklenen etiketi listele
                options={availableTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                isMulti
                className="shadow"
              />
            </Form.Group>
          </Col>
        </Row>
        {/* text içeriği */}
        <Form.Group controlId="markdown">
          <Form.Label>İçerik</Form.Label>
          <Form.Control
            ref={markdownRef}
            as={"textarea"}
            rows={15}
            required
            className="shadow"
            defaultValue={markdown}
          />
        </Form.Group>
        {/* buttonlar */}
        <Stack direction="horizontal" className="btn-group">
          <Button type="submit">Kaydet</Button>
          <Button
            onClick={() => navigate(-1)}
            type="button"
            variant="secondary"
          >
            İptal
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;
