import { Container } from 'react-bootstrap';

export default function ({
  subjectTitle,
  subjectContent,
}: {
  subjectTitle: string;
  subjectContent: string;
}) {
  return (
    <Container>
      <h2>{subjectTitle}</h2>
      <p>{subjectContent}</p>
    </Container>
  );
}
