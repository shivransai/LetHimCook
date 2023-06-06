import React, { useState, useEffect } from 'react';
import './styles/styles.css';
import Button from './components/button'; 
import Select from 'react-select';
import axios from 'axios'; 

const options = [
  { value: 'casual', label: 'Friend' },
  { value: 'professional, clear', label: 'Teacher/Manager' },
  { value: 'Kanye West type, narcissistic, egotistical', label: 'Kanye' },
  { value: 'shakespearean', label: 'Shakesphere' },
];

const App = () => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [buttonNameValue, setButtonNameValue] = useState("Cook Up");

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const handleClick = async () => {
    setIsLoading(true);
    setButtonNameValue("Loading ...");
    setOutputValue("");

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

    setButtonNameValue("Cook Up");
    setIsLoading(false);
  };

  return (
    <div>
    <div className="app">
      <div className='title'>
        <text className='appName'>
          let him cook.
        </text>
      </div>
      <textarea className="input-box"
        type="text" 
        value={inputValue} 
        onChange={handleChange} 
        placeholder="type your message here..."
      />

    <Select className='picker'
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        isMulti={true}
        placeholder="pick who you want to send it to..."
    />

      <Button onClick={handleClick} isLoading={isLoading}>
          Cook Up
      </Button>

      <div className="output-box">
      {isLoading && <img src={process.env.PUBLIC_URL + '/loading.gif'} alt="Loading..." />}
        {outputValue}
      </div>
    </div>
    </div>
  );
};

export default App;