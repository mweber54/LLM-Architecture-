import React from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

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
    backgroundColor: '#f2f2f2',
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
      backgroundColor: '#f2f2f2',
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
      backgroundColor: '#f2f2f2',
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
      backgroundColor: '#f2f2f2',
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
      backgroundColor: '#f2f2f2',
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
      backgroundColor: '#f2f2f2',
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
      backgroundColor: '#f2f2f2',
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
      backgroundColor: '#f2f2f2',
      },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', markerEnd: { type: 'arrowclosed' } },
  { id: 'e2-3', source: '2', target: '3', markerEnd: { type: 'arrowclosed' } },
  { id: 'e3-4', source: '3', target: '4', markerEnd: { type: 'arrowclosed' } },
  { id: 'e4-5', source: '4', target: '5', markerEnd: { type: 'arrowclosed' } },
  { id: 'e5-6', source: '5', target: '6', markerEnd: { type: 'arrowclosed' } },
  { id: 'e6-7', source: '6', target: '7', markerEnd: { type: 'arrowclosed' } },
  { id: 'e7-8', source: '7', target: '8', markerEnd: { type: 'arrowclosed' } },
];



function GPT2ArchitectureFlow() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow nodes={initialNodes} edges={initialEdges} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default GPT2ArchitectureFlow;
