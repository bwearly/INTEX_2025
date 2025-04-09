import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search titles"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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

export default SearchBar;
