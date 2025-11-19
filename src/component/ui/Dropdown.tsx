"use client";

import { useState } from "react";

function QuestionDropdown() {
  const [selected, setSelected] = useState("");

  const questions = [
    "What is your name?",
    "Where do you live?",
    "What is your favorite programming language?",
    "What is your goal in learning tech?",
  ];

  return (
    <div className="w-full max-w-sm mx-auto mt-10">
      <label className="text-lg font-semibold mb-2 block">
        Choose a question:
      </label>

      <select
        className="w-full p-3 border rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">-- Select a question --</option>
        {questions.map((q, index) => (
          <option key={index} value={q}>
            {q}
          </option>
        ))}
      </select>

      {selected && (
        <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-xl">
          <p className="font-medium">{selected}</p>
        </div>
      )}
    </div>
  );
}

export {QuestionDropdown}