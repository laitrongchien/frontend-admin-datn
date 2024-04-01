"use client";

import React, { useState } from "react";
import axios from "axios";

// Component for the form fields
const FormFields = ({ onChange }: { onChange: any }) => {
  return (
    <div>
      <label htmlFor={`name`}>Name:</label>
      <input type="text" id={`name`} name={`name`} onChange={onChange} />
      <label htmlFor={`age}`}>Age:</label>
      <input type="text" id={`age`} name={`age`} onChange={onChange} />
    </div>
  );
};

// Main component
const App = () => {
  const [forms, setForms] = useState<{ name: string; age: string }[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const newForms = [...forms];
    newForms[index] = { ...newForms[index], [name]: value };
    setForms(newForms);
  };

  const handleAddForm = () => {
    setForms([...forms, { name: "", age: "" }]);
  };

  const handleSubmit = async () => {
    console.log(forms);
  };

  return (
    <div>
      {forms.map((form, index) => (
        <div key={index}>
          <FormFields onChange={(e: any) => handleChange(e, index)} />
        </div>
      ))}
      <button onClick={handleAddForm}>Add Form</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default App;
