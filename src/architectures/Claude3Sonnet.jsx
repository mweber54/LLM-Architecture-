import React, { useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  // Text branch
  {
    id: '1',
    data: { label: 'Raw Text Input' },
    position: { x: 0, y:  0},
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
    data: { label: 'Text Cleaning & Normalization' },
    position: { x: -25, y: 100 },
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
    data: { label: 'Text Tokenization & Embedding' },
    position: { x: -25, y: 200 },
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
  // Image branch
  {
    id: '4',
    data: { label: 'Raw Image Input' },
    position: { x: 200, y: 0 },
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
    data: { label: 'Image Preprocessing & Feature Extraction' },
    position: { x: 200, y: 100 },
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
    data: { label: 'Image Encoder & Embedding' },
    position: { x: 200, y: 200 },
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
  // Multimodal fusion and downstream processing
  {
    id: '7',
    data: { label: 'Multimodal Fusion\n(Cross-Modal Attention)' },
    position: { x: 90, y: 300 },
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
    id: '8',
    data: { label: 'Core Transformer Blocks\n(Multi-head Attention, Residuals)' },
    position: { x: 40, y: 400 },
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
    id: '9',
    data: { label: 'Alignment Layer\n(Constitutional AI)' },
    position: { x: 115, y: 500 },
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
    id: '10',
    data: { label: 'Final Text Output' },
    position: { x: 115, y: 600 },
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
  // Text branch flow
  { id: 'e1-2', source: '1', target: '2', markerEnd: { type: 'arrowclosed' } },
  { id: 'e2-3', source: '2', target: '3', markerEnd: { type: 'arrowclosed' } },
  { id: 'e3-7', source: '3', target: '7', animated: true },
  // Image branch flow
  { id: 'e4-5', source: '4', target: '5', markerEnd: { type: 'arrowclosed' } },
  { id: 'e5-6', source: '5', target: '6', markerEnd: { type: 'arrowclosed' } },
  { id: 'e6-7', source: '6', target: '7', animated: true },
  // Downstream processing
  { id: 'e7-8', source: '7', target: '8', markerEnd: { type: 'arrowclosed' }},
  { id: 'e8-9', source: '8', target: '9', markerEnd: { type: 'arrowclosed' } },
  { id: 'e9-10', source: '9', target: '10', markerEnd: { type: 'arrowclosed' } },
];

function Claude3SonnetFlow() {
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

export default Claude3SonnetFlow;
