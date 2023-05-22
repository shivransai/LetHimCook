import React, { useState, useEffect } from 'react';
import './styles.css';
import Button from './components/button'; // path to the Button component
import Select from 'react-select';
import axios from 'axios'; // make sure to install axios with npm install axios

const options = [
  { value: 'casual', label: 'Casual' },
  { value: 'angry', label: 'Angry' },
  { value: 'shakespearean', label: 'Shakespearean' },
];

const App = () => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const handleChange = event => {
    setInputValue(event.target.value);
  };


  const handleClick = async () => {
    try {
      // Create backend client
      const client = axios.create({
        headers: {
          'Content-Type': 'application/json'
        },
      });

      // Format Prompt
      let tone = selectedOption.map(({ value }) => value).join(", ") || "clear";
      const prompt = `Write this InputText in a ${tone} tone. InputText ${inputValue}`;
      console.log(`Calling OpenAI w/ prompt: ${prompt}`)

      // Call backend
      const response = await client.post('https://x82f42xjz5.execute-api.us-east-2.amazonaws.com/prod', {
          inputText: {inputValue},
          tone: {tone}
      });

      // Update view with response 
      console.log(`Recieved the following raw response: ${JSON.stringify(response)}`)
      console.log(`Lambda reponse: ${JSON.stringify(response.data)}`)

      setOutputValue(response.data.body)
    } catch (error) {
      console.error('Error calling API', error);
    }
  };

  return (
    <div className="app">
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleChange} 
        placeholder="Type here..."
      />

    <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        isMulti={true}
    />

      <Button onClick={handleClick}>
          Generate
      </Button>

      <div className="output-box">
        {outputValue}
      </div>
    </div>
  );
};

export default App;