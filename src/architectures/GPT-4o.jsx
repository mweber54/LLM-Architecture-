import React from 'react';
import ReactFlow, { Background, Controls } from 'react-flow-renderer';

const nodes = [
  {
    id: 'node-text',
    type: 'input',
    data: { label: '[Text Input]' },
    position: { x: 50, y: 50 },
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
    id: 'node-image',
    type: 'input',
    data: { label: '[Image Input]' },
    position: { x: 250, y: 50 },
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
    id: 'node-audio',
    type: 'input',
    data: { label: '[Audio Input]' },
    position: { x: 450, y: 50 },
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
    data: { label: '(Preprocessing/Tokenization for each modality)' },
    position: { x: 175, y: 150 },
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
    id: 'node-encoder',
    data: { label: '[Multimodal Input Encoder]' },
    position: { x: 238, y: 250 },
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
        width: 175
        },
  },
  {
    id: 'node-backbone',
    data: {
      label:
        '[Shared Transformer Backbone]\n(Self-Attention, RBRMs, Multimodal Fusion)',
    },
    position: { x: 175, y: 350 },
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
    id: 'node-output',
    data: {
      label:
        '[Modality-Specific Output Heads]\n(Text Generation, Image Generation, Audio Generation)',
    },
    position: { x: 150, y: 450 },
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
        width: 350
        },
  },
  {
    id: 'node-alignment',
    data: {
      label:
        '[Post-Training Alignment & Safety]\n(RLHF, Risk Mitigation, Ethical Filtering)',
    },
    position: { x: 175, y: 550 },
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
];

const edges = [
    // From Input nodes to Preprocessing
    { id: 'e1', source: 'node-text', target: 'node-preprocess', animated: true, label: 'Text Path', markerEnd: { type: 'arrowclosed' } },
    { id: 'e2', source: 'node-image', target: 'node-preprocess', animated: true, label: 'Image Path', markerEnd: { type: 'arrowclosed' } },
    { id: 'e3', source: 'node-audio', target: 'node-preprocess', animated: true, label: 'Audio Path', markerEnd: { type: 'arrowclosed' } },
    // From Preprocessing to Encoder
    { id: 'e4', source: 'node-preprocess', target: 'node-encoder', markerEnd: { type: 'arrowclosed' } },
    // From Encoder to Backbone
    { id: 'e5', source: 'node-encoder', target: 'node-backbone', markerEnd: { type: 'arrowclosed' } },
    // From Backbone to Output Heads
    { id: 'e6', source: 'node-backbone', target: 'node-output', markerEnd: { type: 'arrowclosed' } },
    // From Output Heads to Alignment/Safety
    { id: 'e7', source: 'node-output', target: 'node-alignment', markerEnd: { type: 'arrowclosed' } },
];
  
  

const FlowDiagram = () => {
  return (
    <div style={{ height: '100vh', width: '100%', overflow: 'auto' }}>
  <ReactFlow nodes={nodes} edges={edges} fitView>
    <Background color="#aaa" gap={16} />
    <Controls />
  </ReactFlow>
</div>

  );
};

export default FlowDiagram;
