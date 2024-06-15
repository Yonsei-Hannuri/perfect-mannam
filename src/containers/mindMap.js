import { useRef, useEffect, useState } from 'react';
import NetworkGraph from '../components/networkGraph/networkGraph';
import ButtonSelection from '../components/selection/buttonSelection';

const useMindMap = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const DUMMY = 'DUMMY';
  const ModeType = {
    MOVE: {
      name: '이동',
      dragstarted: (elem, event, d) => {
        elem.raise().attr('stroke', 'black');
      },
      dragged: (elem, event, d) => {
        d.x = event.x;
        d.y = event.y;
      },
      dragended: (elem, event, d) => {
        elem.attr('stroke', null);
      },
      onBackgroundClick: () => {},
      onEdgeClick: () => {},
    },
    ADD: {
      name: '수정',
      dragstarted: (elem, event, d) => {
        const se = event.sourceEvent;
        setNodes((prev) => [
          ...prev,
          {
            id: DUMMY,
            name: '',
            x: se.offsetX,
            y: se.offsetY,
            invisible: true,
          },
        ]);
        setEdges((prev) => [...prev, { source: d.id, target: DUMMY }]);
      },
      dragged: (elem, event, d) => {
        const se = event.sourceEvent;
        setNodes((prev) => [
          ...prev.filter((n) => n.id !== DUMMY),
          {
            id: DUMMY,
            name: '',
            x: se.offsetX,
            y: se.offsetY,
            invisible: true,
          },
        ]);
      },
      dragended: (elem, event, d) => {
        setEdges((prev) => [...prev.filter((n) => n.target !== DUMMY)]);
        setNodes((prev) => {
          let closestNode;
          let closestDist = Infinity;
          const dummyNode = prev.find((n) => n.id === DUMMY);
          const nodes = prev.filter((n) => n.id !== DUMMY);
          for (const node of nodes) {
            const dist =
              Math.abs(node.x - dummyNode.x) + Math.abs(node.y - dummyNode.y);
            if (dist < closestDist) {
              closestDist = dist;
              closestNode = node;
            }
          }
          const isDuplicatedEdge = (edges, newEdge) => {
            return (
              edges.filter((e) => e.edgeId === newEdge.edgeId).length !== 0
            );
          };
          if (closestNode && closestDist < 50) {
            setEdges((prev) => {
              const newEdge = {
                edgeId:
                  d.id < closestNode.id
                    ? `${d.id}-${closestNode.id}`
                    : `${closestNode.id}-${d.id}`,
                source: d.id,
                target: closestNode.id,
              };
              if (isDuplicatedEdge(prev, newEdge)) return prev;
              return [...prev, newEdge];
            });
          }
          return [...prev.filter((n) => n.id !== DUMMY)];
        });
      },
      onBackgroundClick: (e) => {
        const word = prompt('단어 추가');
        if (!word) return;
        setNodes((prev) => {
          if (prev.map((n) => n.id).includes(word)) return prev;
          return [
            ...prev,
            {
              id: word,
              name: word,
              x: e.offsetX,
              y: e.offsetY,
            },
          ];
        });
      },
      onEdgeClick: (edge) => {
        if (!window.confirm('연결을 지우겠습니까?')) return;
        const edgeId =
          edge.source.id < edge.target.id
            ? `${edge.source.id}-${edge.target.id}`
            : `${edge.target.id}-${edge.source.id}`;
        setEdges((prev) => {
          return prev.filter((e) => e.edgeId !== edgeId);
        });
      },
    },
  };
  const [mode, setMode] = useState(ModeType.MOVE);
  return {
    nodes,
    setNodes,
    edges,
    setEdges,
    ModeType,
    mode,
    setMode,
  };
};

export default function MindMap({}) {
  const { nodes, edges, ModeType, mode, setMode } = useMindMap();
  return (
    <>
      <ButtonSelection
        options={Object.values(ModeType).map((e) => e.name)}
        selected={[mode.name]}
        onClickOption={(option) =>
          setMode(Object.values(ModeType).find((e) => e.name === option))
        }
      />
      <NetworkGraph
        nodes={nodes}
        edges={edges}
        width={500}
        height={500}
        margin={{
          top: 100,
          bottom: 100,
          left: 100,
          right: 100,
        }}
        onBackgroundClick={mode.onBackgroundClick}
        dragstarted={mode.dragstarted}
        dragged={mode.dragged}
        dragended={mode.dragended}
        onLinkClick={mode.onEdgeClick}
      />
    </>
  );
}
