export default function Modal({ title, message, onClose }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.4)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        maxWidth: 400,
        width: '80%',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
      }}>
        <h2>{title}</h2>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{message}</pre>
        <button onClick={onClose} style={{ marginTop: 20 }}>Close</button>
      </div>
    </div>
  );
}
