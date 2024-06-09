export default function NetworkGraph({ nodes, edges }) {
  return (
    <div>
      {JSON.stringify(nodes)} {JSON.stringify(edges)}
    </div>
  );
}
