import { useState } from 'react';
import NetworkGraph from '../components/networkGraph/networkGraph';
import ButtonSelection from '../components/selection/buttonSelection';
import { useNode, useEdge } from './store/mindMap';

const useMindMap = () => {
  const nodes = useNode((state) => state.nodes);
  const addNode = useNode((state) => state.addNode);
  const removeNode = useNode((state) => state.removeNode);
  const updateNode = useNode((state) => state.updateNode);
  const edges = useEdge((state) => state.edges);
  const addEdge = useEdge((state) => state.addEdge);
  const removeEdge = useEdge((state) => state.removeEdge);
  const removeEdgeByTarget = useEdge((state) => state.removeEdgeByTarget);

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
        addNode({
          id: DUMMY,
          name: '',
          x: se.offsetX,
          y: se.offsetY,
          invisible: true,
        });
        addEdge({ source: d.id, target: DUMMY });
      },
      dragged: (elem, event, d) => {
        const se = event.sourceEvent;
        updateNode({
          id: DUMMY,
          name: '',
          x: se.offsetX,
          y: se.offsetY,
          invisible: true,
        });
      },
      dragended: (elem, event, d) => {
        removeEdgeByTarget(DUMMY);
        let closestNode;
        let closestDist = Infinity;
        const curNodes = useNode.getState().nodes;
        const dummyNode = curNodes.find((n) => n.id === DUMMY);
        const nodes = curNodes.filter((n) => n.id !== DUMMY);
        for (const node of nodes) {
          const dist =
            Math.abs(node.x - dummyNode.x) + Math.abs(node.y - dummyNode.y);
          if (dist < closestDist) {
            closestDist = dist;
            closestNode = node;
          }
        }
        if (closestNode && closestDist < 50) {
          addEdge({
            source: d.id,
            target: closestNode.id,
          });
        }
        removeNode(DUMMY);
      },
      onBackgroundClick: (e) => {
        const word = prompt('단어 추가');
        if (!word) return;
        addNode({
          id: word,
          name: word,
          x: e.offsetX,
          y: e.offsetY,
        });
      },
      onEdgeClick: (edge) => {
        if (!window.confirm('연결을 지우겠습니까?')) return;
        removeEdge(edge);
      },
    },
  };
  const [mode, setMode] = useState(ModeType.MOVE);
  return {
    nodes,
    edges,
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
