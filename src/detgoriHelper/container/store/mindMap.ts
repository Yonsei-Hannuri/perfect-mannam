import { create } from 'zustand';

type node = {
  id: string;
  name: string;
  x: number;
  y: number;
  invisible: boolean;
};

type NodeState = {
  nodes: node[];
};

type NodeActions = {
  addNode: (newNode: node) => void;
  removeNode: (id: string) => void;
  updateNode: (targetNode: node) => void;
};

export const useNode = create<NodeState & NodeActions>((set) => ({
  nodes: [],
  addNode: (newNode: node) =>
    set((state) => {
      if (state.nodes.some((n) => n.id === newNode.id)) return state;
      return { nodes: [...state.nodes, newNode] };
    }),
  removeNode: (id: string) =>
    set((state) => {
      return {
        nodes: state.nodes.filter((n) => n.id !== id),
      };
    }),
  updateNode: (node) =>
    set((state) => {
      return {
        nodes: [...state.nodes.filter((n) => n.id !== node.id), node],
      };
    }),
}));

type edge = {
  id: string;
  source: string;
  target: string;
};

type EdgeState = {
  edges: edge[];
};

type EdgeActions = {
  addEdge: (edge: { source: string; target: string }) => void;
  removeEdge: (edge: { source: string; target: string }) => void;
  removeEdgeByTarget: (target: string) => void;
};

export const useEdge = create<EdgeState & EdgeActions>((set) => ({
  edges: [],
  addEdge: (edge: { source: string; target: string }) =>
    set((state) => {
      if (edge.source === edge.target) return state;
      const id =
        edge.source < edge.target
          ? `${edge.source}-${edge.target}`
          : `${edge.target}-${edge.source}`;
      if (state.edges.some((e) => e.id === id)) return state;
      return {
        edges: [...state.edges, { ...edge, id }],
      };
    }),
  removeEdge: (edge: { source: string; target: string }) =>
    set((state) => {
      const id =
        edge.source < edge.target
          ? `${edge.source}-${edge.target}`
          : `${edge.target}-${edge.source}`;
      return {
        edges: state.edges.filter((e) => e.id !== id),
      };
    }),
  removeEdgeByTarget: (target: string) =>
    set((state) => ({
      edges: state.edges.filter((edg) => edg.target !== target),
    })),
}));
