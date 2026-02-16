"use client";
import React from "react";

function Row({ label }) {
  const [draft, setDraft] = React.useState(label); // stato locale
  return (
    <div>
      <span>{label}: </span>
      <input value={draft} onChange={(e) => setDraft(e.target.value)} />
    </div>
  );
}
export default function Page() {
  
  const [items, setItems] = React.useState([
    { id: "1", label: "A" },
    { id: "2", label: "B" },
    { id: "3", label: "C" },
  ]);

  return (
    <>
      <button
        onClick={() =>
          setItems([{ id: crypto.randomUUID(), label: "X" }, ...items])
        }
      >
        Inserisci X in testa
      </button>

      {/* ❌ key={index} */}
      {items.map((it, index) => (
        <Row key={index} label={it.label} />
      ))}
    </>
  );
}