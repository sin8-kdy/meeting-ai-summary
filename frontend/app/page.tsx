"use client";

import { useState } from "react";

export default function Home() {
  const [summary, setSummary] = useState("");

  const getSummary = async () => {
    const res = await fetch("http://127.0.0.1:8000/summary");
    const data = await res.json();

    setSummary(data.summary);
  };

  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>会議要約AI</h1>

      <button
        onClick={getSummary}
        style={{
          padding: "10px 20px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        要約取得
      </button>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        {summary}
      </div>
    </main>
  );
}