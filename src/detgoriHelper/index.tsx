import { useState } from 'react';
import Flow1MindMapping from './flow/Flow1MindMapping';
import Flow2CopyWriting from './flow/Flow2CopyWriting';
import Flow3PhaseGeneration from './flow/Flow3PhaseGeneration';
import Flow4CompleteDraft from './flow/Flow4CompleteDraft';
const flows = [
  <Flow1MindMapping />,
  <Flow2CopyWriting />,
  <Flow3PhaseGeneration />,
  <Flow4CompleteDraft />,
];

export default function () {
  const [flowStep, setFlowStep] = useState<number>(0);
  return (
    <>
      <button onClick={() => setFlowStep((prev) => prev - 1)}>{'<'}</button>
      <button onClick={() => setFlowStep((prev) => prev + 1)}>{'>'}</button>
      {flows[flowStep]}
    </>
  );
}
