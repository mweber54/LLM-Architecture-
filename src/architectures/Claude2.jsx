import React, { useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: '1',
    data: { label: 'Raw Data Sources' },
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
    data: { label: 'Data Filtering & Normalization' },
    position: { x: 0, y: 75 },
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
    position: { x: 0, y: 150 },
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
    data: { label: 'Input Embedding Layer\n(with Positional Embeddings)' },
    position: { x: 0, y: 225 },
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
    data: { label: 'Stacked Transformer Layers' },
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
    id: '6',
    data: { label: 'Extended Context Handling\n(up to 100K tokens)' },
    position: { x: 0, y: 375 },
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
    data: { label: 'Output Generation' },
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
  },
  {
    id: '8',
    data: { label: 'Alignment Layer\n(Constitutional AI)' },
    position: { x: 0, y: 525 },
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
    id: '9',
    data: { label: 'Final Model Response' },
    position: { x: 0, y: 750 },
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
    data: { label: 'Pre-training\n(Next-Token Prediction)' },
    position: { x: 0, y: 675 },
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
    id: '11',
    data: { label: 'Fine-tuning\n(SFT & RLHF)' },
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
  { id: 'e1-2', source: '1', target: '2', animated: true, markerEnd: { type: 'arrowclosed' } },
  { id: 'e2-3', source: '2', target: '3', animated: true, markerEnd: { type: 'arrowclosed' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, markerEnd: { type: 'arrowclosed' } },
  { id: 'e4-5', source: '4', target: '5', animated: true, markerEnd: { type: 'arrowclosed' } },
  { id: 'e5-6', source: '5', target: '6', animated: true, markerEnd: { type: 'arrowclosed' } },
  { id: 'e6-7', source: '6', target: '7', animated: true, markerEnd: { type: 'arrowclosed' } },
  { id: 'e7-8', source: '7', target: '8', animated: true, markerEnd: { type: 'arrowclosed' } },
  { id: 'e8-9', source: '8', target: '9', animated: true, markerEnd: { type: 'arrowclosed' } },
  { id: 'e10-11', source: '10', target: '11', animated: true, markerEnd: { type: 'arrowclosed' } },
  { id: 'e11-8', source: '11', target: '8', animated: true, markerEnd: { type: 'arrowclosed' } },
];

function ModelArchitectureFlow() {
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

export default ModelArchitectureFlow;
