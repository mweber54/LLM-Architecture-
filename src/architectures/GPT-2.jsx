
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import { BaseEdge, getBezierPath } from 'reactflow';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Tokens' },
    position: { x: 50, y: 0 },
    style: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #aaa',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    },
  },
  {
  id: '2',
  data: { label: 'Token Embeddings' },
  position: { x: 50, y: 80 },
  style: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #aaa',
    borderRadius: '5px',
    backgroundColor: '#FFDAB9',
  },
  },
  {
    id: '3',
    data: { label: 'Positional Embeddings' },
    position: { x: 50, y: 160 },
    style: {
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #aaa',
      borderRadius: '5px',
      backgroundColor: '#edffb0',
      },
  },
  {
  id: '4',
  data: { label: 'Add: Token + Positional Embeddings' },
  position: { x: 50, y: 240 },
  style: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #aaa',
    borderRadius: '5px',
    backgroundColor: '#f7a881', 
  },
},
  {
    id: '5',
    data: {
      label: (
        <div style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
          Transformer Blocks (xN, <strong>1.5B parameters</strong>)
          {"\n"}[Masked Multi-Head Self-Attention]
          {"\n"}[Feed-Forward Network]
          {"\n"}[Residual Connections & Layer Norm]
        </div>
      ),
    },
    position: { x: -25, y: 320 },
    style: {
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #aaa',
      borderRadius: '5px',
      backgroundColor: '#81b6f7',
      width: '300px'
      },
  },
  {
    id: '6',
    data: { label: 'Final Layer Normalization' },
    position: { x: 50, y: 450 },
    style: {
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #aaa',
      borderRadius: '5px',
      backgroundColor: '#bea9fc',
      },
  },
  {
    id: '7',
    data: { label: 'Linear Projection to Vocabulary' },
    position: { x: 50, y: 550},
    style: {
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #aaa',
      borderRadius: '5px',
      backgroundColor: '#d8bfd8',
      },
  },
  {
    id: '8',
    data: { label: 'Softmax' },
    position: { x: 50, y: 650 },
    style: {
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #aaa',
      borderRadius: '5px',
      backgroundColor: '#95e6af',
      },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'redArrow', animated: true },
  { id: 'e2-3', source: '2', target: '3', type: 'redArrow', animated: true },
  { id: 'e3-4', source: '3', target: '4', type: 'redArrow', animated: true },
  { id: 'e4-5', source: '4', target: '5', type: 'redArrow', animated: true },
  { id: 'e5-6', source: '5', target: '6', type: 'redArrow', animated: true },
  { id: 'e6-7', source: '6', target: '7', type: 'redArrow', animated: true },
  { id: 'e7-8', source: '7', target: '8', type: 'redArrow', animated: true },
];


const RedArrowEdge = ({ id, sourceX, sourceY, targetX, targetY, markerEnd }) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <defs>
        <marker
          id="arrow-red"
          markerWidth="6"
          markerHeight="6"
          refX="6"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="red" />
        </marker>
      </defs>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd="url(#arrow-red)"
        style={{ stroke: 'red' }}
      />
    </>
  );
};




function GPT2ArchitectureFlow() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
      nodes={initialNodes}
      edges={initialEdges}
      fitView
      edgeTypes={{ redArrow: RedArrowEdge }} // Register your custom edge
  >

        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default GPT2ArchitectureFlow;
