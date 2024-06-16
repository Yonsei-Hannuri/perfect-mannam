import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function ({ onAdd }: { onAdd: (text: string) => void }) {
  const [input, setInput] = useState<string>('');
  return (
    <Container>
      <Row>
        <Col sm={11}>
          <Form.Control
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Normal text"
          />
        </Col>
        <Col style={{ padding: 0 }}>
          <Button
            variant="outline-secondary"
            onClick={() => {
              onAdd(input);
              setInput('');
            }}
          >
            +
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
