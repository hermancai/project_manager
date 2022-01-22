import React, { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((res) => setText(res.message));
  });

  return (
    <div>
      <p className="text-green-900">{text ? text : "Loading..."}</p>
    </div>
  );
}

export default App;
