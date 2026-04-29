import React from 'react';
import { createRoot } from 'react-dom/client';

console.log("Hydration test script active");

const TestComponent = () => (
  <div style={{ padding: '20px', background: 'red', color: 'white', position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
    HYDRATION TEST: IF YOU SEE THIS, REACT RENDERED
  </div>
);

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<TestComponent />);
} else {
  console.error("No root container found for hydration test");
}
