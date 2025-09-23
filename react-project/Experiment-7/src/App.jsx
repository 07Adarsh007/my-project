// src/App.jsx
import React from 'react';
import ProductCard from './components/ProductCard.jsx'; // adjust path if needed
import './App.css'; // optional CSS for App styling

function App() {
  return (
    <div className="App">
      <h1>Welcome to My React App</h1>
      {/* Example usage of ProductCard component */}
      <ProductCard
        name="Sample Product"
        price={99.99}
        inStock={true}
      />
    </div>
  );
}

export default App;
