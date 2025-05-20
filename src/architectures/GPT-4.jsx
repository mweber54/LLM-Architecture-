// src/architectures/Transformer.jsx
import React from 'react';
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import { BaseEdge, getBezierPath } from 'reactflow';
import 'reactflow/dist/style.css';


const RedArrowEdge = ({ id, sourceX, sourceY, targetX, targetY }) => {
  const [edgePath] = getBezierPath({ sourceX, sourceY, targetX, targetY });

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

const sharedStyle = {
  fontFamily: 'monospace',
  fontWeight: 'bold',
  fontSize: '10px',
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
  padding: '10px',
  border: '1px solid #aaa',
  borderRadius: '5px',
  backgroundColor: '#f2f2f2',
};

const initialNodes = [
  {
    id: 'inputs',
    position: { x: 100, y: 50 },
    data: { label: 'Inputs' },
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
    id: 'outputs-shifted',
    position: { x: 300, y: 50 },
    data: { label: 'Outputs (shifted right)' },
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
    id: 'input-embedding',
    position: { x: 110, y: 130 },
    data: { label: 'Input Embedding' },
    style: {
      ...sharedStyle,
      backgroundColor: '#FFDAB9',
      width: '130px',
    },
  },
  {
    id: 'output-embedding',
    position: { x: 310, y: 130 },
    data: { label: 'Output Embedding' },
    style: {
      ...sharedStyle,
      backgroundColor: '#FFDAB9',
      width: '130px',
    },
  },
  {
    id: 'pos-enc-encoder',
    position: { x: 95, y: 210 },
    data: { label: 'Positional Encoding (Encoder)' },
    style: {
      ...sharedStyle,
      backgroundColor: '#edffb0',
      width: '160px',
    },
  },
  {
    id: 'pos-enc-decoder',
    position: { x: 295, y: 210 },
    data: { label: 'Positional Encoding (Decoder)' },
    style: {
      ...sharedStyle,
      backgroundColor: '#edffb0',
      width: '160px',
    },
  },
  {
    id: 'encoder-stack',
    position: { x: 25, y: 300 },
    data: {
      label: 'Encoder (Nx)\n[Multi-Head Attention + Feed Forward]',
    },
    style: {
      ...sharedStyle,
      backgroundColor: '#81b6f7',
      width: '250px',
    },
  },
  {
    id: 'decoder-stack',
    position: { x: 115, y: 400 },
    data: {
      label:
        'Decoder (Nx)\n[Masked MHA + MHA (encoder output) + Feed Forward]',
    },
    style: {
      ...sharedStyle,
      backgroundColor: '#81b6f7',
      width: '320px',
    },
  },
  {
    id: 'linear',
    position: { x: 235, y: 490 },
    data: { label: 'Linear' },
    style: {
      ...sharedStyle,
      backgroundColor: '#D8BFD8',
      width: '80px',
    },
  },
  {
    id: 'softmax',
    position: { x: 235, y: 560 },
    data: { label: 'Softmax' },
    style: {
      ...sharedStyle,
      backgroundColor: '#90EE90',
      width: '80px',
    },
  },
  {
    id: 'output-probabilities',
    position: { x: 200, y: 630 },
    data: { label: 'Output Probabilities' },
    style: {
      ...sharedStyle,
      backgroundColor: 'transparent',
    },
  },
];

const initialEdges = [
  { id: 'edge-inputs-embedding', source: 'inputs', target: 'input-embedding', type: 'redArrow', animated: true },
  { id: 'edge-embedding-posenc-enc', source: 'input-embedding', target: 'pos-enc-encoder', type: 'redArrow', animated: true },
  { id: 'edge-posenc-encoder-stack', source: 'pos-enc-encoder', target: 'encoder-stack', type: 'redArrow', animated: true },
  { id: 'edge-outputs-embedding', source: 'outputs-shifted', target: 'output-embedding', type: 'redArrow', animated: true },
  { id: 'edge-embedding-posenc-dec', source: 'output-embedding', target: 'pos-enc-decoder', type: 'redArrow', animated: true },
  { id: 'edge-posenc-decoder-stack', source: 'pos-enc-decoder', target: 'decoder-stack', type: 'redArrow', animated: true },
  {
    id: 'edge-encoder-decoder',
    source: 'encoder-stack',
    target: 'decoder-stack',
    type: 'redArrow',
    animated: true,
  },
  { id: 'edge-decoder-linear', source: 'decoder-stack', target: 'linear', type: 'redArrow', animated: true },
  { id: 'edge-linear-softmax', source: 'linear', target: 'softmax', type: 'redArrow', animated: true },
  { id: 'edge-softmax-probs', source: 'softmax', target: 'output-probabilities', type: 'redArrow', animated: true },
];



function TransformerArchitectureFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          edgeTypes={{ redArrow: RedArrowEdge }}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default TransformerArchitectureFlow;
