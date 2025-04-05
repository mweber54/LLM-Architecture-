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
  // Top row: Inputs (left) and Outputs (shifted right) (right) with no border
  {
    id: 'inputs',
    position: { x: 100, y: 50 },
    data: { label: 'Inputs' },
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
    id: 'outputs-shifted',
    position: { x: 300, y: 50 },
    data: { label: 'Outputs (shifted right)' },
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


  // Second row: Input Embedding (left) & Output Embedding (right)
  {
    id: 'input-embedding',
    position: { x: 110, y: 130 },
    data: { label: 'Input Embedding' },
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
      width: '130px'
      },
  },
  {
    id: 'output-embedding',
    position: { x: 310, y: 130 },
    data: { label: 'Output Embedding' },
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
      width: '130px'
      },
  },


  // Third row: Positional Encoding (Encoder) & (Decoder)
  {
    id: 'pos-enc-encoder',
    position: { x: 95, y: 210 },
    data: { label: 'Positional Encoding (Encoder)' },
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
      width: '160px'
      },
  },
  {
    id: 'pos-enc-decoder',
    position: { x: 295, y: 210 },
    data: { label: 'Positional Encoding (Decoder)' },
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
      width: '160px'
      },
  },


  // Fourth row: Encoder stack in the center
  {
    id: 'encoder-stack',
    position: { x: 25, y: 300 },
    data: { label: 'Encoder (Nx)\n[Multi-Head Attention + Feed Forward]' },
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
      width: '250px'
      },
  },


  // Fifth row: Decoder stack in the center
  {
    id: 'decoder-stack',
    position: { x: 115, y: 400 },
    data: {
      label:
        'Decoder (Nx)\n[Masked MHA + MHA (encoder output) + Feed Forward]',
    },
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
      width: '320px'
    },
  },


  // Sixth row: Linear
  {
    id: 'linear',
    position: { x: 235, y: 490 },
    data: { label: 'Linear' },
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
      width: '80px'
      },
  },


  // Seventh row: Softmax
  {
    id: 'softmax',
    position: { x: 235, y: 560 },
    data: { label: 'Softmax' },
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
      width: '80px'
    },
  },


  // Eighth row: Output Probabilities (no border)
  {
    id: 'output-probabilities',
    position: { x: 200, y: 630 },
    data: { label: 'Output Probabilities' },
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
  // Encoder flow (left side)
  {
    id: 'edge-inputs-embedding',
    source: 'inputs',
    target: 'input-embedding',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'edge-embedding-posenc-enc',
    source: 'input-embedding',
    target: 'pos-enc-encoder',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'edge-posenc-encoder-stack',
    source: 'pos-enc-encoder',
    target: 'encoder-stack',
    markerEnd: { type: MarkerType.ArrowClosed },
  },


  // Decoder flow (right side)
  {
    id: 'edge-outputs-embedding',
    source: 'outputs-shifted',
    target: 'output-embedding',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'edge-embedding-posenc-dec',
    source: 'output-embedding',
    target: 'pos-enc-decoder',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'edge-posenc-decoder-stack',
    source: 'pos-enc-decoder',
    target: 'decoder-stack',
    markerEnd: { type: MarkerType.ArrowClosed },
  },


  // Cross-attention from encoder to decoder
  {
    id: 'edge-encoder-decoder',
    source: 'encoder-stack',
    target: 'decoder-stack',
    animated: true,
    label: 'Encoder Output',
    labelStyle: { fontFamily: 'monospace'},
    markerEnd: { type: MarkerType.ArrowClosed },
  },


  // Final projection flow (decoder -> linear -> softmax -> output probs)
  {
    id: 'edge-decoder-linear',
    source: 'decoder-stack',
    target: 'linear',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'edge-linear-softmax',
    source: 'linear',
    target: 'softmax',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'edge-softmax-probs',
    source: 'softmax',
    target: 'output-probabilities',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];


function App() {
  // Use React Flow’s node/edge state so you can drag them if needed
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


export default App;



