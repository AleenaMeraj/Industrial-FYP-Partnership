import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  const add = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ name })
    });
    const newItem = await res.json();
    setItems([newItem, ...items]);
    setName('');
  };

  return (
    <div style={{padding:20}}>
      <h1>Items</h1>
      <form onSubmit={add}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="New item" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {items.map(i => <li key={i._id}>{i.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
