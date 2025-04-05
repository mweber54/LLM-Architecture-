// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import your architecture components
import GPT2 from './architectures/GPT-2'; 
import GPT3 from './architectures/GPT-3'; 
import GPT35 from './architectures/GPT-3.5';    // GPT-3.5
import GPT4 from './architectures/GPT-4'; 
import GPT4o from './architectures/GPT-4o';      // GPT-4o
import GPT_o1_Preview from './architectures/GPT-o1-preview';  // GPT-o1 Preview
import GPT_o1_Mini from './architectures/GPT-o1-mini';          // GPT-o1 Mini

// Anthropic's Claude series
import Claude2 from './architectures/Claude2';
import Claude3Haiku from './architectures/Claude3Haiku';
import Claude3Sonnet from './architectures/Claude3Sonnet';
import Claude3Opus from './architectures/Claude3Opus';
import Claude35Haiku from './architectures/Claude35Haiku';

// Other architectures
import Gemini from './architectures/Gemini'; 
import Lamda from './architectures/Lamda'; // Google’s LaMDA (if available)
import Llama from './architectures/Llama'; 
import Llama2 from './architectures/Llama2'; // Adjust filename as needed
import Qwen from './architectures/Qwen';
import DeepSeekR1 from './architectures/DeepSeek-R1';
import DeepSeekV3 from './architectures/DeepSeek-V3';

function Landing() {
  // Define model groups with logos (using paths to files in the public folder)
  const modelGroups = [
    {
      developer: 'OpenAI',
      logo: '/chatgpt.png',
      models: [
        { path: '/gpt2', label: 'GPT-2' },
        { path: '/gpt3', label: 'GPT-3' },
        { path: '/gpt3.5', label: 'GPT-3.5' },
        { path: '/gpt4', label: 'GPT-4' },
        { path: '/gpt4o', label: 'GPT-4o' },
        { path: '/gpt-o1-preview', label: 'GPT-o1 Preview' },
        { path: '/gpt-o1-mini', label: 'GPT-o1 Mini' },
      ],
    },
    {
      developer: 'DeepSeek',
      logo: '/deepseek.png',
      models: [
        { path: '/deepseek-r1', label: 'DeepSeek-R1' },
        { path: '/deepseek-v3', label: 'DeepSeek-V3' },
      ],
    },
    {
      developer: 'Anthropic',
      logo: '/claude.png',
      models: [
        { path: '/claude2', label: 'Claude 2' },
        { path: '/claude3-haiku', label: 'Claude 3 Haiku' },
        { path: '/claude3-sonnet', label: 'Claude 3 Sonnet' },
        { path: '/claude3-opus', label: 'Claude 3 Opus' },
        { path: '/claude3.5-haiku', label: 'Claude 3.5 Haiku' },
      ],
    },
    {
      developer: 'Google',
      logo: '/gemini.png',
      models: [
        { path: '/gemini', label: 'Gemini' },
        { path: '/lamda', label: 'LaMDA' },
      ],
    },
    {
      developer: 'Meta',
      logo: '/meta%20llama.png',  // URL-encoded space
      models: [
        { path: '/llama', label: 'LLaMA' },
        { path: '/llama2.0', label: 'LLaMA 2.0' },
      ],
    },
    {
      developer: 'Alibaba',
      logo: '/qwen%20ai.webp',  // URL-encoded space
      models: [
        { path: '/qwen', label: 'Qwen' },
      ],
    },
  ];

  return (
    <div style={{ padding: '40px', background: '#fff', minHeight: 'calc(100vh - 80px)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>
        Select Your AI Model Architecture
      </h1>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '40px',
      }}>
        {modelGroups.map((group) => (
          <div key={group.developer} style={{ minWidth: '250px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <img 
                src={group.logo} 
                alt={`${group.developer} logo`} 
                style={{ width: '40px', height: '40px', marginRight: '10px' }} 
              />
              <h2 style={{ margin: 0 }}>{group.developer}</h2>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
            }}>
              {group.models.map(({ path, label }) => (
                <Link key={path} to={path} style={{ textDecoration: 'none' }}>
                  <div style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '20px',
                    textAlign: 'center',
                    background: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                    onMouseOver={e => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                    }}>
                    <h3 style={{ margin: 0, color: '#000' }}>{label}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header style={{
          padding: '20px',
          backgroundColor: '#333',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h1 style={{ margin: 0 }}>LLM Architectures</h1>
          <nav>
            <ul style={{
              display: 'flex',
              gap: '20px',
              listStyle: 'none',
              margin: 0,
              padding: 0
            }}>
              <li>
                <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
              </li>
              {/* Additional direct links can go here if needed */}
            </ul>
          </nav>
        </header>
        <main style={{ padding: '20px', backgroundColor: '#fff' }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/gpt2" element={<GPT2 />} />
            <Route path="/gpt3" element={<GPT3 />} />
            <Route path="/gpt3.5" element={<GPT35 />} />
            <Route path="/gpt4" element={<GPT4 />} />
            <Route path="/gpt4o" element={<GPT4o />} />
            <Route path="/gpt-o1-preview" element={<GPT_o1_Preview />} />
            <Route path="/gpt-o1-mini" element={<GPT_o1_Mini />} />
            <Route path="/claude2" element={<Claude2 />} />
            <Route path="/claude3-haiku" element={<Claude3Haiku />} />
            <Route path="/claude3-sonnet" element={<Claude3Sonnet />} />
            <Route path="/claude3-opus" element={<Claude3Opus />} />
            <Route path="/claude3.5-haiku" element={<Claude35Haiku />} />
            <Route path="/gemini" element={<Gemini />} />
            <Route path="/lamda" element={<Lamda />} />
            <Route path="/llama" element={<Llama />} />
            <Route path="/llama2.0" element={<Llama2 />} />
            <Route path="/qwen" element={<Qwen />} />
            <Route path="/deepseek-r1" element={<DeepSeekR1 />} />
            <Route path="/deepseek-v3" element={<DeepSeekV3 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
