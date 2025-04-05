import React, { useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  // Text branch
  {
    id: '1',
    data: { label: 'Raw Text Input' },
    position: { x: -75, y: 0 },
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
    data: { label: 'Text Preprocessing\n(Cleaning, Tokenization, Embedding)' },
    position: { x: -125, y: 100 },
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
  // Image branch
  {
    id: '3',
    data: { label: 'Raw Image Input' },
    position: { x: 225, y: 0 },
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
    data: { label: 'Image Preprocessing\n(Feature Extraction & Encoding)' },
    position: { x: 175, y: 100},
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
  // Fusion
  {
    id: '5',
    data: { label: 'Multimodal Fusion\n(Cross-Modal Attention)' },
    position: { x: 90, y: 250 },
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
  // Core Transformer Backbone
  {
    id: '6',
    data: { label: 'Core Transformer Backbone\n(Multi-head Self-Attention, Feed-Forward,\nExtended Context up to 200K tokens)' },
    position: { x: 15, y: 400 },
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
  // Domain-Specific Fine-Tuning
  {
    id: '7',
    data: { label: 'Domain-Specific Fine-Tuning\n(Scientific, Legal, Financial Data)' },
    position: { x: -200, y: 250 },
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
  // Alignment layer
  {
    id: '8',
    data: { label: 'Alignment Layer\n(Constitutional AI)' },
    position: { x: 90, y: 500 },
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
  // Final Output
  {
    id: '9',
    data: { label: 'Final Text Output' },
    position: { x: 90, y: 600 },
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
  { id: 'e1-2', source: '1', target: '2',  markerEnd: { type: 'arrowclosed' } },
  // Image branch flow
  { id: 'e3-4', source: '3', target: '4',  markerEnd: { type: 'arrowclosed' } },
  // Fusion step: merging text and image information
  { id: 'e2-5', source: '2', target: '5',  markerEnd: { type: 'arrowclosed' } },
  { id: 'e4-5', source: '4', target: '5',  markerEnd: { type: 'arrowclosed' } },
  // Core transformer processing
  { id: 'e5-6', source: '5', target: '6',  markerEnd: { type: 'arrowclosed' } },
  // Domain-specific fine-tuning feeds into core processing
  { id: 'e7-6', source: '7', target: '6', animated: true },
  // Alignment layer applied after processing
  { id: 'e6-8', source: '6', target: '8',  markerEnd: { type: 'arrowclosed' } },
  // Final output generation
  { id: 'e8-9', source: '8', target: '9',  markerEnd: { type: 'arrowclosed' } },
];

function Claude3OpusFlow() {
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

export default Claude3OpusFlow;
