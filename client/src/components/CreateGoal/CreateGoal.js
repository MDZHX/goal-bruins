import React, { useState } from 'react';

import SubmitButton from '../SubmitButton/SubmitButton';

function CreateGoal({ createGoal }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = (e) => {
    console.log(111);
    e.preventDefault();
    createGoal({ name, description }, setName, setDescription);
  }

  return (
    <form onSubmit={handleSubmit} className="create-goal-form">
      <ul>
        <li>
          <label htmlFor="new-goal-name">Name</label>
          <input
            type="text"
            id="new-goal-name"
            name="new-goal-name"
            value={name}
            placeholder="Name"
            onChange={handleNameChange}
            required
          />
        </li>
        <li>
          <label htmlFor="new-goal-description">Description</label>
          <input
            type="text"
            id="new-goal-description"
            name="new-goal-description"
            value={description}
            placeholder="Description"
            onChange={handleDescriptionChange}
            required
          />
        </li>
      </ul>

      <SubmitButton>
        Create
      </SubmitButton>
    </form>
  );
}

export default CreateGoal;
