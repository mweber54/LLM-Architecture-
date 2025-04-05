import React from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  // Core Transformer Model remains
  {
    id: 'transformer',
    data: { label: 'Decoder-only Transformer' },
    position: { x: 250, y: 200 },
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
  // Key Enhancements Container
  {
    id: 'enhancements',
    data: { label: 'Key Architectural Enhancements' },
    position: { x: 250, y: 300 },
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
  // Enhancement Nodes
  {
    id: 'embedding',
    data: { label: 'Untied Embedding & Output Projection' },
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
        width: 200
    },
  },
  {
    id: 'rope',
    data: { label: 'Rotary Positional Embedding (RoPE)' },
    position: { x: 250, y: 400 },
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
    id: 'norm',
    data: { label: 'Normalization: RMSNorm' },
    position: { x: 500, y: 400 },
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
    id: 'activation',
    data: { label: 'Activation: SwiGLU' },
    position: { x: 100, y: 500 },
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
    id: 'bias-handling',
    data: { label: 'Bias Handling (Only in QKV layers)' },
    position: { x: 400, y: 500 },
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
        width: 225
    },
  },
  // Training Optimization
  {
    id: 'training',
    data: { label: 'Training Optimization & Context Extension' },
    position: { x: 225, y: 600 },
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
    id: 'optimizer',
    data: { label: 'AdamW Optimizer & Cosine LR Decay' },
    position: { x: 0, y: 700 },
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
    id: 'batch',
    data: { label: 'Batch Size: 4M tokens' },
    position: { x: 250, y: 700 },
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
    id: 'context',
    data: { label: 'Context Length Extension\n(NTK-aware & Dynamic Scaling)' },
    position: { x: 500, y: 700 },
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
  // Attention Mechanisms Container
  {
    id: 'attention',
    data: { label: 'Attention Mechanisms' },
    position: { x: 250, y: 800 },
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
    id: 'moe',
    data: { label: 'Mixture-of-Experts (MoE)' },
    position: { x: -200, y: 900 },
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
    id: 'flash',
    data: { label: 'Flash Attention' },
    position: { x: 25, y: 900 },
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
    id: 'logn',
    data: { label: 'LogN-Scaling' },
    position: { x: 250, y: 900 },
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
    id: 'window',
    data: { label: 'Windowed Attention' },
    position: { x: 700, y: 900 },
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
    id: 'ntk',
    data: { label: 'NTK-aware Interpolation' },
    position: { x: 475, y: 900 },
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
];

const initialEdges = [
  // Architecture flow (removed edges referencing deleted nodes)
  { id: 'e3', source: 'transformer', target: 'enhancements' },
  // Enhancements branching out
  { id: 'e4', source: 'enhancements', target: 'embedding' },
  { id: 'e5', source: 'enhancements', target: 'rope' },
  { id: 'e6', source: 'enhancements', target: 'norm' },
  { id: 'e7', source: 'enhancements', target: 'activation' },
  { id: 'e8', source: 'enhancements', target: 'bias-handling' },
  // Training optimization from transformer
  { id: 'e9', source: 'transformer', target: 'training' },
  { id: 'e10', source: 'training', target: 'optimizer' },
  { id: 'e11', source: 'training', target: 'batch' },
  { id: 'e12', source: 'training', target: 'context' },
  // Attention mechanisms
  { id: 'e13', source: 'training', target: 'attention' },
  { id: 'e14', source: 'attention', target: 'moe' },
  { id: 'e15', source: 'attention', target: 'flash' },
  { id: 'e16', source: 'attention', target: 'logn' },
  { id: 'e17', source: 'attention', target: 'window' },
  { id: 'e18', source: 'attention', target: 'ntk' },
];

const QwenFlow = () => {
  return (
    <div style={{ width: '100%', height: '1000px' }}>
      <ReactFlow nodes={initialNodes} edges={initialEdges} fitView>
        <MiniMap />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default QwenFlow;
