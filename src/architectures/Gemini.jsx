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
      backgroundColor: '#ffdab9',
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
      backgroundColor: '#edffb0',
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
      backgroundColor: '#81b6f7',
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
      backgroundColor: '#81b6f7',
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
      backgroundColor: '#f7a881',
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
      backgroundColor: '#f7a881',
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
      backgroundColor: '#f7a881',
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
      backgroundColor: '#d8bfd8',
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
      backgroundColor: '#95e6af',
    },
  },
];


const initialEdges = [
  // Flow from Inputs to Multimodal Encoder
  {
    id: 'edge1',
    source: 'inputs',
    target: 'multimodal-encoder',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' },
  },
  // Multimodal Encoder to Cross-Modal Attention
  {
    id: 'edge2',
    source: 'multimodal-encoder',
    target: 'cross-modal-attention',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' },
  },
  // Cross-Modal Attention to Multimodal Decoder
  {
    id: 'edge3',
    source: 'cross-modal-attention',
    target: 'multimodal-decoder',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' },
  },
  // Multimodal Decoder to each Expert
  {
    id: 'edge4',
    source: 'multimodal-decoder',
    target: 'text-expert',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' },
  },
  {
    id: 'edge5',
    source: 'multimodal-decoder',
    target: 'image-expert',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' },
  },
  {
    id: 'edge6',
    source: 'multimodal-decoder',
    target: 'fusion-expert',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' },
  },
  // Experts to Gating Network
  {
    id: 'edge7',
    source: 'text-expert',
    target: 'gating-network',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' },
  },
  {
    id: 'edge8',
    source: 'image-expert',
    target: 'gating-network',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' },
  },
  {
    id: 'edge9',
    source: 'fusion-expert',
    target: 'gating-network',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' },
  },
  // Gating Network to Final Output
  {
    id: 'edge10',
    source: 'gating-network',
    target: 'final-output',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' },
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



