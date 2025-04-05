// src/architectures/Llama.jsx
import React, { memo } from 'react';
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

/**
 * Default node styling applied to every node.
 */
const defaultNodeStyle = {
  fontFamily: 'monospace',
  fontWeight: 'bold',
  fontSize: '10px',
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
  padding: '10px',
  border: '1px solid #aaa',
  borderRadius: '5px',
  backgroundColor: '#f2f2f2',
};

/*
  --------------------------
  CUSTOM NODE: LlamaNxNode
  --------------------------
  This custom node renders the "Nx" block.
*/
const styles = {
  container: {
    width: 220,
    minHeight: 280,
    border: '2px dotted #999',
    borderRadius: 6,
    position: 'relative',
    background: '#fafafa',
    fontSize: 12,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: '6px 0',
  },
  nxLabel: {
    position: 'absolute',
    left: -20,
    top: '50%',
    transform: 'translateY(-50%) rotate(-90deg)',
    fontWeight: 'bold',
    color: '#444',
    fontSize: 14,
  },
  subBlock: {
    border: '1px solid #ccc',
    margin: '4px 8px',
    borderRadius: 4,
    padding: 6,
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  qkvContainer: {
    display: 'flex',
    gap: '6px',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  qkvBlock: {
    border: '1px solid #ccc',
    borderRadius: 4,
    padding: '6px',
    background: '#fff',
    fontSize: 12,
  },
};

/**
 * Reusable sub-block component for the LlamaNxNode.
 */
const SubBlock = ({ title, subText, children }) => (
  <div style={styles.subBlock}>
    {title && <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{title}</div>}
    {children}
    {subText && <div style={{ fontSize: 10 }}>{subText}</div>}
  </div>
);

/**
 * Custom Node: LlamaNxNode.
 */
const LlamaNxNode = memo(() => {
  const qkvItems = ['Q', 'K', 'V', '⊗ Rotary'];

  return (
    <div style={styles.container}>
      <div style={styles.nxLabel}>Nx</div>
      
      <SubBlock title="RMS Norm" />
      
      <SubBlock title="Self-Attention" subText="(Grouped Multi-Query, KV Cache)">
        <div style={styles.qkvContainer}>
          {qkvItems.map((item) => (
            <div key={item} style={styles.qkvBlock}>{item}</div>
          ))}
        </div>
      </SubBlock>
      
      <SubBlock title="RMS Norm" />
      <SubBlock title="Feed Forward" subText="(SwiGLU)" />
      <SubBlock title="RMS Norm" />
    </div>
  );
});

// Register the custom node type.
const nodeTypes = {
  llamaNx: LlamaNxNode,
};

/**
 * Initial nodes for the flow diagram.
 * The RMS Norm nodes have been removed. Nodes now include:
 * Input -> Embeddings -> Nx block -> Linear -> Softmax -> Output.
 */
const initialNodes = [
  {
    id: 'input',
    position: { x: 0, y: 35 },
    data: { label: 'Input' },
    style: { ...defaultNodeStyle },
    type: 'input',
  },
  {
    id: 'embeddings',
    position: { x: 15, y: 100 },
    data: { label: 'Embeddings' },
    style: { ...defaultNodeStyle, width: 120 },
  },
  {
    id: 'nx-block',
    type: 'llamaNx',
    position: { x: -37, y: 150 },
    data: {},
  },
  {
    id: 'linear',
    position: { x: 35, y: 475 },
    data: { label: 'Linear' },
    style: { ...defaultNodeStyle, width: 80 },
  },
  {
    id: 'softmax',
    position: { x: 35, y: 525 },
    data: { label: 'Softmax' },
    style: { ...defaultNodeStyle, width: 80 },
  },
  {
    id: 'output',
    position: { x: 0, y: 575 },
    data: { label: 'Output' },
    style: { ...defaultNodeStyle },
    type: 'output',
  },
];

/**
 * Initial edges for the flow diagram.
 * Updated to connect embeddings directly to the Nx block,
 * and the Nx block directly to the linear node.
 */
const initialEdges = [
  {
    id: 'edge-input-emb',
    source: 'input',
    target: 'embeddings',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'edge-emb-linear',
    source: 'embeddings',
    target: 'linear',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'edge-emb-nx',
    source: 'embeddings',
    target: 'nx-block',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'rgba(0, 0, 0, 0.2)' },
  },
  {
    id: 'edge-nx-linear',
    source: 'nx-block',
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
    id: 'edge-softmax-output',
    source: 'softmax',
    target: 'output',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

/**
 * The main Llama component rendering the flow diagram.
 */
function Llama() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodeTypes={nodeTypes}
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

export default Llama;
