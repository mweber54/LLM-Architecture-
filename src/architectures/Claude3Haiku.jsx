import React, { useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: '1',
    data: { label: 'Raw Text' },
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
    data: { label: 'Cleaning/Normalization' },
    position: { x: 0, y: 100 },
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
    data: { label: 'Tokenization' },
    position: { x: 0, y: 200 },
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
    data: { label: 'Embedding Layer' },
    position: { x: 0, y: 300 },
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
    data: { label: 'Core Transformer Blocks\n(Multi-head Attention, Feed-forward, Residuals)' },
    position: { x: 0, y: 400 },
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
    id: '6',
    data: { label: 'Alignment Layer\n(Constitutional AI)' },
    position: { x: 0, y: 500 },
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
    data: { label: 'Final Text Output' },
    position: { x: 0, y: 600 },
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
  { id: 'e1-2', source: '1', target: '2',  markerEnd: { type: 'arrowclosed' } },
  { id: 'e2-3', source: '2', target: '3',  markerEnd: { type: 'arrowclosed' } },
  { id: 'e3-4', source: '3', target: '4',  markerEnd: { type: 'arrowclosed' } },
  { id: 'e4-5', source: '4', target: '5',  markerEnd: { type: 'arrowclosed' } },
  { id: 'e5-6', source: '5', target: '6',  markerEnd: { type: 'arrowclosed' } },
  { id: 'e6-7', source: '6', target: '7',  markerEnd: { type: 'arrowclosed' } },
];

function Claude3HaikuFlow() {
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

export default Claude3HaikuFlow;
