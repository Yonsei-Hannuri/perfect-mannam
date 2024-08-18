import { useEffect } from 'react';
import { useSubject } from './store/subject';
import Subject from '../components/subject/Subject';

export default function ({ subjectId }: { subjectId: string }) {
  const { subject, fetch, loading } = useSubject();
  useEffect(() => {
    fetch();
  }, []);
  return (
    <Subject
      subjectTitle={subject.subjectTitle}
      subjectContent={subject.subjectContent}
    />
  );
}
