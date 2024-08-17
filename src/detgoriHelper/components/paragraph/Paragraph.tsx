import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export default function ({
  paragraph,
  onChat,
}: {
  paragraph: { title: string; content: string };
  onChat: (chat: string) => void;
}) {
  const [chat, setChat] = useState('');
  return (
    <Container>
      <Row>{paragraph.title}</Row>
      <Row>{paragraph.content}</Row>
      <Row>
        <Col sm={10}>
          <Form.Control
            value={chat}
            onChange={(e) => setChat(e.target.value)}
          ></Form.Control>
        </Col>
        <Col sm={2}>
          <Button
            onClick={() => {
              onChat(chat);
              setChat('');
            }}
          >
            input
          </Button>
        </Col>
      </Row>
    </Container>
  );
}