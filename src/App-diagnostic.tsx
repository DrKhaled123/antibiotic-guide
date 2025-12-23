// Diagnostic version
function App() {
  console.log('App component rendering...');
  
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f9ff',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#2563eb', textAlign: 'center' }}>🩺 AntibioticGuide</h1>
      <div style={{ 
        background: 'white', 
        padding: '24px', 
        borderRadius: '12px', 
        marginTop: '24px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h2>✅ App is Working!</h2>
        <p>If you can see this, the React app is successfully mounted and running.</p>
        <div style={{ marginTop: '16px', padding: '12px', background: '#e0f2fe', borderRadius: '8px' }}>
          <strong>Next:</strong> Testing full functionality...
        </div>
      </div>
    </div>
  );
}

export default App;