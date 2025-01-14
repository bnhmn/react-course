import { useState } from 'react';
import { createProject } from '../lib/data';

export function ProjectForm({ onSubmit, onCancel }) {
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState('Learn Next.js');
  const [description, setDescription] = useState('I want to learn Next.js!');
  const [dueDate, setDueDate] = useState('2028-12-31');

  const handleSubmit = () => {
    setSubmitted(true);
    if (title && description && dueDate) {
      onSubmit(createProject(title, description, dueDate));
    }
  };

  return (
    <>
      <Buttons onSubmit={handleSubmit} onCancel={onCancel} />
      <form className="space-y-3">
        <Input label="Title" onChange={setTitle} invalid={submitted && !title} value={title} />
        <Input
          label="Description"
          onChange={setDescription}
          invalid={submitted && !description}
          value={description}
          textarea
        />
        <Input label="Due Date" onChange={setDueDate} invalid={submitted && !dueDate} type="date" value={dueDate} />
      </form>
    </>
  );
}

function Buttons({ onSubmit, onCancel }) {
  return (
    <div className="flow-root w-full">
      <div className="float-right space-x-4">
        <button className="hover:text-red-600" onClick={onCancel}>
          Cancel
        </button>
        <button className="px-5 py-1 rounded-lg text-stone-200 bg-stone-700 hover:bg-stone-500" onClick={onSubmit}>
          Save
        </button>
      </div>
    </div>
  );
}

function Input({ type = 'text', label, value, textarea = false, invalid = false, onChange }) {
  const InputElement = textarea ? 'textarea' : 'input';
  const labelColor = invalid ? 'text-red-500' : 'text-stone-500';
  const textFormat = invalid
    ? 'text-red-600 bg-stone-200 border-red-300 focus:border-red-600'
    : 'text-black-600 bg-stone-200  border-stone-300 focus:border-stone-600';

  return (
    <div className="space-y-0.5">
      <label htmlFor={label} className={`text-xs uppercase font-bold ${labelColor}`}>
        {label}
      </label>
      <br />
      <InputElement
        type={type}
        id={label}
        className={`w-full px-1 py-1 rounded-sm text-sm  border-b-2 focus:outline-none ${textFormat}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      ></InputElement>
    </div>
  );
}
