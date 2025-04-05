// src/architectures/Gemini.jsx
import React from 'react';
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';


const initialNodes = [
  // Bottom: Inputs for all modalities
  {
    id: 'inputs',
    position: { x: 175, y: 0 },
    data: { label: 'Inputs (Text, Image, Code)' },
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
  // Multimodal Encoder
  {
    id: 'multimodal-encoder',
    position: { x: 200, y: 100 },
    data: { label: 'Multimodal Encoder' },
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
  // Cross-Modal Attention Network
  {
    id: 'cross-modal-attention',
    position: { x: 175, y: 200 },
    data: { label: 'Cross-Modal Attention' },
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
  // Multimodal Decoder
  {
    id: 'multimodal-decoder',
    position: { x: 200, y: 300 },
    data: { label: 'Multimodal Decoder' },
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
  // Mixture-of-Experts (MoE) components:
  {
    id: 'text-expert',
    position: { x: 25, y: 400 },
    data: { label: 'Text Expert\n(60% weight)\nPositive' },
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
    id: 'image-expert',
    position: { x: 200, y: 400 },
    data: { label: 'Image Expert\n(30% weight)\nNeutral' },
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
    id: 'fusion-expert',
    position: { x: 375, y: 400 },
    data: { label: 'Fusion Expert\n(10% weight)\nMismatch Flag' },
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
  // Gating Network that integrates expert outputs
  {
    id: 'gating-network',
    position: { x: 200, y: 500 },
    data: { label: 'Gating Network' },
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
    id: 'final-output',
    position: { x: 200, y: 600 },
    data: { label: 'Output' },
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
  // Flow from Inputs to Multimodal Encoder
  {
    id: 'edge1',
    source: 'inputs',
    target: 'multimodal-encoder',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  // Multimodal Encoder to Cross-Modal Attention
  {
    id: 'edge2',
    source: 'multimodal-encoder',
    target: 'cross-modal-attention',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  // Cross-Modal Attention to Multimodal Decoder
  {
    id: 'edge3',
    source: 'cross-modal-attention',
    target: 'multimodal-decoder',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  // Multimodal Decoder to each Expert
  {
    id: 'edge4',
    source: 'multimodal-decoder',
    target: 'text-expert',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'edge5',
    source: 'multimodal-decoder',
    target: 'image-expert',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'edge6',
    source: 'multimodal-decoder',
    target: 'fusion-expert',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  // Experts to Gating Network
  {
    id: 'edge7',
    source: 'text-expert',
    target: 'gating-network',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'edge8',
    source: 'image-expert',
    target: 'gating-network',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'edge9',
    source: 'fusion-expert',
    target: 'gating-network',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  // Gating Network to Final Output
  {
    id: 'edge10',
    source: 'gating-network',
    target: 'final-output',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];


function Gemini() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          attributionPosition="bottom-right"
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}


export default Gemini;



