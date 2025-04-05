import React, { useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: '1',
    data: { label: 'Raw Text Input' },
    position: { x: 0, y: 0 },
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
    data: { label: 'Preprocessing\n(Cleaning & Normalization)' },
    position: { x: -25, y: 75 },
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
        width: 200
    },
  },
  {
    id: '3',
    data: { label: 'Tokenization & Embedding\n(Subword Tokens, Positional Encoding)' },
    position: { x: -50, y: 150 },
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
        width: 250
    },
  },
  {
    id: '4',
    data: {
      label:
        'Large Transformer Stack\n(Increased Depth/Width, 200K Token Context)\n[Enhanced Coding & Reasoning]'
    },
    position: { x: -75, y: 225 },
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
        width: 300
    },
  },
  {
    id: '5',
    data: { label: 'Output Decoding\n(Extended Generation up to 8K Tokens)' },
    position: { x: -50, y: 300 },
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
        width: 250
    },
  },
  {
    id: '6',
    data: { label: 'Alignment & Safety Layer\n(Constitutional AI, RLHF)' },
    position: { x: -50, y: 375 },
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
        width: 250
    },
  },
  {
    id: '7',
    data: { label: 'Final Text Output' },
    position: { x: 0, y: 450 },
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
  }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2',  markerEnd: { type: 'arrowclosed' } },
  { id: 'e2-3', source: '2', target: '3',  markerEnd: { type: 'arrowclosed' } },
  { id: 'e3-4', source: '3', target: '4',  markerEnd: { type: 'arrowclosed' } },
  { id: 'e4-5', source: '4', target: '5',  markerEnd: { type: 'arrowclosed' } },
  { id: 'e5-6', source: '5', target: '6',  markerEnd: { type: 'arrowclosed' } },
  { id: 'e6-7', source: '6', target: '7',  markerEnd: { type: 'arrowclosed' } }
];

function Claude35HaikuFlow() {
  const [nodes] = useState(initialNodes);
  const [edges] = useState(initialEdges);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
}

export default Claude35HaikuFlow;
