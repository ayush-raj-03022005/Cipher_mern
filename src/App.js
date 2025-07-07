import React, { useState, createContext, useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Inline styles
const appStyles = {
  fontFamily: 'sans-serif',
  background: '#f9f9f9',
  minHeight: '100vh',
  margin: 0,
  padding: 0,
};

const headerStyles = {
  background: '#282c34',
  minHeight: '30vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
};

const logoStyles = {
  height: '80px',
  marginBottom: '16px',
};

const sectionStyles = {
  maxWidth: '600px',
  margin: '32px auto',
  background: '#fff',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  padding: '32px',
};

const productCardStyles = {
  border: '1px solid #eee',
  borderRadius: '8px',
  padding: '16px',
  margin: '12px 0',
  background: '#fafbfc',
  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
};

const buttonStyles = {
  padding: '8px 20px',
  margin: '12px 0 0 0',
  borderRadius: '6px',
  border: 'none',
  background: '#007bff',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const inputStyles = {
  width: '100%',
  padding: '8px',
  margin: '0 0 20px 0',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

// Theme Context
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

function ProductCard({ name, price }) {
  const [liked, setLiked] = useState(false);

  return (
    <div style={productCardStyles}>
      <h2>{name}</h2>
      <p style={{ fontSize: '20px', margin: '8px 0' }}>${price}</p>
      <button
        style={{
          ...buttonStyles,
          background: liked ? '#e63946' : '#007bff',
          transition: 'background 0.2s',
        }}
        onClick={() => setLiked(!liked)}
      >
        {liked ? 'Liked ❤️' : 'Like 🤍'}
      </button>
    </div>
  );
}

function ProductSearch({ onSearch }) {
  const [query, setQuery] = useState('');

  function handleChange(e) {
    setQuery(e.target.value);
    onSearch(e.target.value);
  }

  return (
    <input
      style={inputStyles}
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search products..."
    />
  );
}

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return (
      <div style={{ color: 'red', marginTop: '16px', fontWeight: 'bold' }}>
        Please log in to access the Checkout page.
      </div>
    );
  }
  return children;
}

function EcommerceFeatures() {
  const [products] = useState([
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ThemeProvider>
      <div style={sectionStyles}>
        <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>E-commerce Web App</h1>
        <ProductSearch onSearch={setSearchQuery} />
        <div>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} name={product.name} price={product.price} />
          ))}
        </div>
        <button
          style={{
            ...buttonStyles,
            background: userIsLoggedIn ? '#6c757d' : '#28a745',
            marginTop: '24px',
          }}
          onClick={() => setUserIsLoggedIn(!userIsLoggedIn)}
        >
          {userIsLoggedIn ? 'Logout' : 'Login'}
        </button>
        <ProtectedRoute isAuthenticated={userIsLoggedIn}>
          <div style={{ marginTop: '32px', padding: '20px', background: '#e9ffe9', borderRadius: '8px' }}>
            <h2 style={{ color: '#28a745' }}>Checkout Page</h2>
            <p>Only visible to logged-in users.</p>
          </div>
        </ProtectedRoute>
      </div>
    </ThemeProvider>
  );
}

function App() {
  return (
    <div style={appStyles}>
      <header style={headerStyles}>
        <div style={logoStyles}>
          <span role="img" aria-label="logo" style={{ fontSize: '64px' }}>🛒</span>
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          style={{
            color: '#61dafb',
            textDecoration: 'underline',
            marginTop: '8px',
          }}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <EcommerceFeatures />
    </div>
  );
}

export default App;
