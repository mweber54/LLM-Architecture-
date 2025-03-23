import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import GPT1 from './architectures/GPT-1'; 
import GPT2 from './architectures/GPT-2'; 
import GPT3 from './architectures/GPT-3'; 
import GPT4 from './architectures/GPT-4'; 
import Gemini from './architectures/Gemini'; 
import Llama from './architectures/Llama'; 
import DeepSeekR1 from './architectures/DeepSeek-R1';
import DeepSeekV3 from './architectures/DeepSeek-V3';

function Landing() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px',
      background: '#fff',
      minHeight: 'calc(100vh - 80px)'
    }}>
      <h1 style={{ marginBottom: '20px' }}>Select Your AI Model Architecture</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '1000px'
      }}>
        {[
          { path: '/gpt1', label: 'GPT-1' },
          { path: '/gpt2', label: 'GPT-2' },
          { path: '/gpt3', label: 'GPT-3' },
          { path: '/gpt', label: 'GPT-4' },
          { path: '/gemini', label: 'Gemini' },
          { path: '/llama', label: 'Llama' }, 
          { path: '/deepseek-r1', label: 'DeepSeek-R1' },
          { path: '/deepseek-v3', label: 'DeepSeek-V3' },
        ].map(({ path, label }) => (
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
              <li>
                <Link to="/gpt1" style={{ color: '#fff', textDecoration: 'none' }}>GPT-1</Link>
              </li>
              <li>
                <Link to="/gpt2" style={{ color: '#fff', textDecoration: 'none' }}>GPT-2</Link>
              </li>
              <li>
                <Link to="/gpt3" style={{ color: '#fff', textDecoration: 'none' }}>GPT-3</Link>
              </li>
              <li>
                <Link to="/gpt" style={{ color: '#fff', textDecoration: 'none' }}>GPT-4</Link>
              </li>
              <li>
                <Link to="/gemini" style={{ color: '#fff', textDecoration: 'none' }}>Gemini</Link>
              </li>
              <li>
                <Link to="/llama" style={{ color: '#fff', textDecoration: 'none' }}>Llama</Link>
              </li>
              <li>
                <Link to="/deepseek-r1" style={{ color: '#fff', textDecoration: 'none' }}>DeepSeek-R1</Link>
              </li>
              <li>
                <Link to="/deepseek-v3" style={{ color: '#fff', textDecoration: 'none' }}>DeepSeek-V3</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main style={{ padding: '20px', backgroundColor: '#fff' }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/gpt1" element={<GPT1 />} />
            <Route path="/gpt2" element={<GPT2 />} />
            <Route path="/gpt3" element={<GPT3 />} />
            <Route path="/gpt" element={<GPT4 />} />
            <Route path="/gemini" element={<Gemini />} />
            <Route path="/llama" element={<Llama />} />
            <Route path="/deepseek-r1" element={<DeepSeekR1 />} />
            <Route path="/deepseek-v3" element={<DeepSeekV3 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;