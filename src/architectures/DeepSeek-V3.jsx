// src/architectures/DeepSeek-V3.jsx
import React, { useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
} from 'react-flow-renderer';

const nodeStyle = {
  fontFamily: 'monospace',
  fontWeight: 'bold',
  fontSize: '10px',
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
  padding: '10px',
  borderRadius: '5px',
  backgroundColor: 'transparent',
  width: '110px',
};

/* 
  Custom Node for Embedding Layers 
  Variants:
  - 'left': top, bottom, and right handle.
  - 'middle': handles on all four sides.
  - 'right': top, bottom, and left handle.
*/
const EmbeddingNode = ({ data }) => {
  const embeddingStyle = {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #000000', // Unified border for all embedding nodes
    borderRadius: '5px',
    backgroundColor: 'transparent', // Transparent background for all embedding nodes
    width: '120px', // Unified width for all embedding nodes
  };

  return (
    <div style={embeddingStyle}>
      {data.label}
      <Handle type="target" position="top" id="top" style={{ background: '#555' }} />
      <Handle type="source" position="bottom" id="bottom" style={{ background: '#555' }} />
      <Handle type="source" position="left" id="left" style={{ background: '#555' }} />
      <Handle type="target" position="right" id="right" style={{ background: '#555' }} />
    </div>
  );
};

/* 
  Custom Node for Output Heads 
  Variants:
  - 'left': top, bottom, and right handle.
  - 'middle': handles on all four sides.
  - 'right': top, bottom, and left handle.
*/
const OutputNode = ({ data }) => {
  return (
    <div
      style={{
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: '10px',
        textAlign: 'center',
        whiteSpace: 'pre-wrap',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: 'transparent',
        width: '110px',
      }}
    >
      {data.label}
      <Handle type="target" position="top" id="top" style={{ background: '#555' }} />
      <Handle type="source" position="bottom" id="bottom" style={{ background: '#555' }} />
      <Handle type="source" position="left" id="left" style={{ background: '#555' }} />
      <Handle type="target" position="right" id="right" style={{ background: '#555' }} />
    </div>
  );
};

// Register the custom node types
const nodeTypes = {
  embedding: EmbeddingNode,
  output: OutputNode,
};

const initialNodes = [
  // === INPUT TOKENS & TARGET TOKENS ===
  {
    id: 'inputTokens',
    data: { label: 'Input Tokens' },
    position: { x: 60, y: 30 },
    style: { 
    width: 120, 
    textAlign: 'center', 
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #000000', // Unified border for all embedding nodes
    borderRadius: '5px',
    backgroundColor: '#f2f2f2',  },
  },
  {
    id: 'targetTokens',
    data: { label: 'Target Tokens' },
    position: { x: 60, y: 600 },
    style: { 
    width: 120, 
    textAlign: 'center', 
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #000000', // Unified border for all embedding nodes
    borderRadius: '5px',
    backgroundColor: '#f2f2f2',  },
  },

  // === MAIN MODEL (left) ===
  {
    id: 'embeddingLayerMain',
    type: 'embedding',
    data: { label: 'Embedding Layer (shared)', variant: 'shared' }, // Add variant: 'shared'
    position: { x: -150, y: 125 },
    style: { 
    width: 142, 
    textAlign: 'center', backgroundColor: '#f2f2f2', }
  },
  {
    id: 'transformerBlocks',
    data: { label: 'Transformer Block × L' },
    position: { x: -160, y: 250 },
    style: {
      width: 160,
      height: 80,
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', 
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #000000', // Unified border for all embedding nodes
      borderRadius: '5px',
      backgroundColor: '#f2f2f2',
    },
  },
  {
    id: 'outputHeadMain',
    type: 'output',
    data: { label: 'Output Head', variant: 'left' },
    position: { x: -155, y: 425 },
    style: {
    textAlign: 'center', 
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #000000', 
    borderRadius: '5px',
    backgroundColor: '#f2f2f2',
    },
  },
  {
    id: 'mainCrossEntropy',
    data: { label: 'Cross-Entropy Loss (Main)' },
    position: { x: -160, y: 500 },
    style: { 
    width: 160, 
    textAlign: 'center', 
    backgroundColor: '#fff3e0',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #000000', // Unified border for all embedding nodes
    borderRadius: '5px', },
  },

  // === MTP MODULE 1 (middle) ===
  {
    id: 'embeddingLayerMTP1',
    type: 'embedding',
    data: { label: 'Embedding Layer (shared)', variant: 'middle' },
    position: { x: 50, y: 125 },
    style: { width: 142, textAlign: 'center', backgroundColor: '#f2f2f2',},
  },
  {
    id: 'transformerBlockMTP1',
    data: { label: 'Transformer Block' },
    position: { x: 61, y: 350 },
    style: { 
    width: 120, 
    textAlign: 'center', 
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #000000', // Unified border for all embedding nodes
    borderRadius: '5px',
    backgroundColor: '#f2f2f2',},
  },
  {
    id: 'rmsNormMTP1',
    data: { label: 'RMSNorm' },
    position: { x: 71, y: 200 },
    style: { 
    width: 100, 
    textAlign: 'center', 
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #000000', // Unified border for all embedding nodes
    borderRadius: '5px',
    backgroundColor: '#f2f2f2',},
  },
  {
    id: 'linearProjectionMTP1',
    data: { label: 'Linear Projection' },
    position: { x: 61, y: 275 },
    style: { 
    width: 120, 
    textAlign: 'center', 
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #000000', // Unified border for all embedding nodes
    borderRadius: '5px',
    backgroundColor: '#f2f2f2',
  },
  },
  {
    id: 'outputHeadMTP1',
    type: 'output',
    data: { label: 'Output Head', variant: 'middle' },
    position: { x: 46, y: 425 },
    style: { backgroundColor: '#f2f2f2',}
  },
  {
    id: 'mtp1CrossEntropy',
    data: { label: 'Cross-Entropy Loss (MTP1)' },
    position: { x: 41, y: 500 },
    style: { 
    width: 160, 
    textAlign: 'center', 
    backgroundColor: '#fff3e0', 
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #000000', // Unified border for all embedding nodes
    borderRadius: '5px' },
  },

  // === MTP MODULE 2 (right) ===
  {
    id: 'embeddingLayerMTP2',
    type: 'embedding',
    data: { label: 'Embedding Layer (shared)', variant: 'right' },
    position: { x: 250, y: 125 },
    style: { width: 142, textAlign: 'center', backgroundColor: '#f2f2f2',},
  },
  {
    id: 'transformerBlockMTP2',
    data: { label: 'Transformer Block' },
    position: { x: 261, y: 350 },
    style: { 
    width: 120, 
    textAlign: 'center', 
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #000000', // Unified border for all embedding nodes
    borderRadius: '5px',
    backgroundColor: '#f2f2f2', },
  },
  {
    id: 'linearProjectionMTP2',
    data: { label: 'Linear Projection' },
    position: { x: 261, y: 275 },
    style: { 
    width: 120, 
    textAlign: 'center', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #000000', // Unified border for all embedding nodes
    borderRadius: '5px',
    backgroundColor: '#f2f2f2',},
  },
  {
    id: 'rmsNormMTP2',
    data: { label: 'RMSNorm' },
    position: { x: 271, y: 200 },
    style: { 
    width: 100, 
    textAlign: 'center', 
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #000000', // Unified border for all embedding nodes
    borderRadius: '5px',
    backgroundColor: '#f2f2f2',},
  },
  {
    id: 'outputHeadMTP2',
    type: 'output',
    data: { label: 'Output Head', variant: 'right' },
    position: { x: 246, y: 425 },
    style: { backgroundColor: '#f2f2f2',}
  },
  {
    id: 'mtp2CrossEntropy',
    data: { label: 'Cross-Entropy Loss (MTP2)' },
    position: { x: 241, y: 500 },
    style: { 
    width: 160, 
    textAlign: 'center', 
    backgroundColor: '#fff3e0', 
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #000000', // Unified border for all embedding nodes
    borderRadius: '5px' },
  },
];

const initialEdges = [
  { id: 'e-input-embeddingMain', source: 'inputTokens', target: 'embeddingLayerMain', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-input-embeddingMTP1', source: 'inputTokens', target: 'embeddingLayerMTP1', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-input-embeddingMTP2', source: 'inputTokens', target: 'embeddingLayerMTP2', markerEnd: { type: 'arrowclosed' } },

  { id: 'e-embeddingMain-transformerBlocks', source: 'embeddingLayerMain', target: 'transformerBlocks', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-transformerBlocks-outputHeadMain', source: 'transformerBlocks', target: 'outputHeadMain', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-outputHeadMain-mainCrossEntropy', source: 'outputHeadMain', target: 'mainCrossEntropy', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-mainCrossEntropy-targetTokens', source: 'mainCrossEntropy', target: 'targetTokens', markerEnd: { type: 'arrowclosed' } },

  { id: 'e-embeddingMTP1-rmsNormMTP1', source: 'embeddingLayerMTP1', target: 'rmsNormMTP1', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-rmsNormMTP1-linearProjectionMTP1', source: 'rmsNormMTP1', target: 'linearProjectionMTP1', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-linearProjectionMTP1-transformerBlockMTP1', source: 'linearProjectionMTP1', target: 'transformerBlockMTP1', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-transformerBlockMTP1-outputHeadMTP1', source: 'transformerBlockMTP1', target: 'outputHeadMTP1', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-outputHeadMTP1-crossEntropyMTP1', source: 'outputHeadMTP1', target: 'mtp1CrossEntropy', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-mtp1CrossEntropy-targetTokens', source: 'mtp1CrossEntropy', target: 'targetTokens', markerEnd: { type: 'arrowclosed' } },

  { id: 'e-embeddingMTP2-rmsNormMTP2', source: 'embeddingLayerMTP2', target: 'rmsNormMTP2', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-rmsNormMTP2-linearProjectionMTP2', source: 'rmsNormMTP2', target: 'linearProjectionMTP2', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-linearProjectionMTP2-transformerBlockMTP2', source: 'linearProjectionMTP2', target: 'transformerBlockMTP2', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-transformerBlockMTP2-outputHeadMTP2', source: 'transformerBlockMTP2', target: 'outputHeadMTP2', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-outputHeadMTP2-crossEntropyMTP2', source: 'outputHeadMTP2', target: 'mtp2CrossEntropy', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-mtp2CrossEntropy-targetTokens', source: 'mtp2CrossEntropy', target: 'targetTokens', markerEnd: { type: 'arrowclosed' } },

  // === Animated Edges for Embedding Layers (Right to Left) ===
  {
    id: 'e-embeddingLayerMTP2-embeddingLayerMTP1',
    source: 'embeddingLayerMTP2',
    target: 'embeddingLayerMTP1',
    animated: true,
    style: { stroke: '#D3D3D3', strokeWidth: 2 },
    sourceHandle: 'left',
    targetHandle: 'right',
  },
  {
    id: 'e-embeddingLayerMTP1-embeddingLayerMain',
    source: 'embeddingLayerMTP1',
    target: 'embeddingLayerMain',
    animated: true,
    style: { stroke: '#D3D3D3', strokeWidth: 2 },
    sourceHandle: 'left',
    targetHandle: 'right',
  },

  // === Animated Edges for Output Heads (Right to Left) ===
  {
    id: 'e-outputHeadMTP2-outputHeadMTP1',
    source: 'outputHeadMTP2',
    target: 'outputHeadMTP1',
    animated: true,
    style: { stroke: '#D3D3D3', strokeWidth: 2 },
    sourceHandle: 'left',
    targetHandle: 'right',
  },
  {
    id: 'e-outputHeadMTP1-outputHeadMain',
    source: 'outputHeadMTP1',
    target: 'outputHeadMain',
    animated: true,
    style: { stroke: '#D3D3D3', strokeWidth: 2 },
    sourceHandle: 'left',
    targetHandle: 'right',
  },

  // === New Animated Edges ===
  {
    id: 'e-transformerBlocks-rmsNormMTP1',
    source: 'transformerBlocks',
    target: 'rmsNormMTP1',
    animated: true,
    style: { stroke: '#D3D3D3', strokeWidth: 2 },
    sourceHandle: 'top',
    targetHandle: 'bottom',
  },
  {
    id: 'e-transformerBlockMTP1-rmsNormMTP2',
    source: 'transformerBlockMTP1',
    target: 'rmsNormMTP2',
    animated: true,
    style: { stroke: '#D3D3D3', strokeWidth: 2 },
    sourceHandle: 'top',
    targetHandle: 'bottom',
  },
];


const DeepSeekV3 = () => {
  // Use React Flow's hooks to manage nodes and edges state
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100%', height: '1000px' }}>
      <h2>V3 Architecture Diagram</h2>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodeTypes={nodeTypes}
      >
        <MiniMap
          nodeStrokeColor={(node) => {
            if (node.id.includes('MTP1')) return '#FF9500';
            if (node.id.includes('MTP2')) return '#FF2D55';
            if (node.id.includes('Main')) return '#007AFF';
            return '#C0C0C0';
          }}
        />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default DeepSeekV3;
