import React, { useState, useEffect } from 'react';

export default function NotFound() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} timess</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
