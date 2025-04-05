import React from 'react';
import ReactFlow, { Background, Controls } from 'react-flow-renderer';

const nodes = [
  {
    id: 'node-text',
    type: 'input',
    data: { label: '[Text Input]' },
    position: { x: 150, y: 50 },
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
    id: 'node-preprocess',
    data: { label: '(Preprocessing/Tokenization)' },
    position: { x: 125, y: 120 },
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
    id: 'node-embedding',
    data: { label: '[Input Embedding & Positional Encoding]' },
    position: { x: 150, y: 190 },
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
  // Transformer Block 1
  {
    id: 'node-attention1',
    data: { label: 'Block 1: Multi-Head Self-Attention' },
    position: { x: -25, y: 260 },
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
    id: 'node-ffn1',
    data: { label: 'Block 1: Feed-Forward Network' },
    position: { x: 150, y: 260 },
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
    id: 'node-cot1',
    data: { label: 'Block 1: Chain-of-Thought Reasoning' },
    position: { x: 325, y: 260 },
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
  // Transformer Block 2
  {
    id: 'node-attention2',
    data: { label: 'Block 2: Multi-Head Self-Attention' },
    position: { x: -25, y: 340 },
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
    id: 'node-ffn2',
    data: { label: 'Block 2: Feed-Forward Network' },
    position: { x: 150, y: 340 },
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
    id: 'node-cot2',
    data: { label: 'Block 2: Chain-of-Thought Reasoning' },
    position: { x: 325, y: 340 },
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
  // Transformer Block 3
  {
    id: 'node-attention3',
    data: { label: 'Block 3: Multi-Head Self-Attention' },
    position: { x: -25, y: 420 },
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
    id: 'node-ffn3',
    data: { label: 'Block 3: Feed-Forward Network' },
    position: { x: 150, y: 420 },
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
    id: 'node-cot3',
    data: { label: 'Block 3: Chain-of-Thought Reasoning' },
    position: { x: 325, y: 420 },
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
  // Aggregated Backbone Output
  {
    id: 'node-backbone-output',
    data: { label: '[Aggregated Transformer Output]' },
    position: { x: 150, y: 500 },
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
    id: 'node-output',
    data: { label: '[Text Output Head]' },
    position: { x: 150, y: 580 },
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
    id: 'node-alignment',
    data: { label: '[Post-Training Alignment & Safety]' },
    position: { x: 100, y: 660 },
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
];

const edges = [
    { id: 'e1', source: 'node-text', target: 'node-preprocess', markerEnd: { type: 'arrowclosed' } },
    { id: 'e2', source: 'node-preprocess', target: 'node-embedding', markerEnd: { type: 'arrowclosed' } },
    // Transformer Block 1
    { id: 'e3', source: 'node-embedding', target: 'node-attention1', markerEnd: { type: 'arrowclosed' } },
    { id: 'e4', source: 'node-attention1', target: 'node-ffn1', animated: true },
    { id: 'e5', source: 'node-ffn1', target: 'node-cot1', animated: true },
    // Transition from Block 1 to Block 2
    { id: 'e6', source: 'node-cot1', target: 'node-attention2', animated: true },
    { id: 'e7', source: 'node-attention2', target: 'node-ffn2', animated: true },
    { id: 'e8', source: 'node-ffn2', target: 'node-cot2', animated: true },
    // Transition from Block 2 to Block 3
    { id: 'e9', source: 'node-cot2', target: 'node-attention3', animated: true },
    { id: 'e10', source: 'node-attention3', target: 'node-ffn3', animated: true },
    { id: 'e11', source: 'node-ffn3', target: 'node-cot3', animated: true },
    // Merge transformer backbone output
    { id: 'e12', source: 'node-cot3', target: 'node-backbone-output', markerEnd: { type: 'arrowclosed' } },
    { id: 'e13', source: 'node-backbone-output', target: 'node-output', markerEnd: { type: 'arrowclosed' } },
    { id: 'e14', source: 'node-output', target: 'node-alignment', markerEnd: { type: 'arrowclosed' } },
];
  
  

const O1PreviewExpandedFlow = () => {
  return (
    <div style={{ height: '1000px', width: '100%', overflow: 'auto' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background color="#aaa" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default O1PreviewExpandedFlow;
