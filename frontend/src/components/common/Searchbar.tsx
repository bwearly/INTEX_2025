import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  // Store the current search input
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Handle form submission and redirect to search results page
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Only navigate if the input is not empty
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    // Basic search form
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search titles"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query as user types
        style={{
          padding: '8px',
          borderRadius: '4px',
          background: '#222',
          color: '#fff',
          border: 'none',
        }}
      />
    </form>
  );
};

export default Searchbar;
