import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [healthStatus, setHealthStatus] = useState('unknown');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    fetchItems();
    checkHealth();
    document.body.className = theme;
  }, [theme]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/items');
      setItems(response.data);
    } catch (err) {
      setError('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const checkHealth = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/health');
      if (response.data.status === 'healthy') {
        setHealthStatus('healthy');
      } else {
        setHealthStatus('unhealthy');
      }
    } catch (err) {
      setHealthStatus('unhealthy');
    }
  };

  const handleCreateItem = async () => {
    setLoading(true);
    try {
      const newItem = { title, description };
      await axios.post('http://localhost:8000/api/items', newItem);
      fetchItems();
      setTitle('');
      setDescription('');
    } catch (err) {
      setError('Failed to create item');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8000/api/items/${id}`);
      fetchItems();
    } catch (err) {
      setError('Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="App">
      <header>
        <h1>Full-Stack App</h1>
        <div className={`health-status ${healthStatus}`}>
          {healthStatus === 'healthy' ? 'API is healthy' : 'API is unhealthy'}
        </div>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </button>
      </header>
      <main>
        <div className="form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button onClick={handleCreateItem} disabled={loading}>
            {loading ? 'Creating...' : 'Create Item'}
          </button>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="items">
          {loading ? (
            <div className="skeleton-item">
              <div className="skeleton-title"></div>
              <div className="skeleton-description"></div>
              <div className="skeleton-button"></div>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="item">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <button onClick={() => handleDeleteItem(item.id)} disabled={loading}>
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
