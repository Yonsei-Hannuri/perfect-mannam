import NetworkGraph from './networkGraph';

const meta = {
  title: 'Network Graph',
  component: NetworkGraph,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

export const Basic = {
  args: {
    nodes: ['노드'],
    edges: ['엣지'],
  },
};
