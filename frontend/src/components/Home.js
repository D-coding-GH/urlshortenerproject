import React, {  useState } from 'react';
import axios from 'axios';
import './home.css';

const Home = () => {
  const [url, sendURL] = useState('');

  const [backendResponse, setBackendResponse] = useState('');
  const [hash, setLink] = useState('');

  const formHandler = async (e) => {
    console.log(e.target.value)
    e.preventDefault();
    console.log(url);
  
    const body = {
      longURL: url, 
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    

    const sendLink = await axios.post('/api/originalURL', body, config);
    setBackendResponse(sendLink.data.message);
    console.log(sendLink);
     

    // then()
    
    const response2 = await axios.get('/api/sendlink', );
    console.log(response2);
    

    setLink(`website/${response2.data.hash}`);

  
  };

  return (
    <div>
      <form onSubmit={formHandler}>
        <label>url </label>
        <input
          type="text"
          name="longURL"
          
          onChange={(e) => sendURL(e.target.value)
          }
          
        />
        <br />
        <button>grab link</button>
        <h1>{setLink}</h1>
      </form>

      {backendResponse}
    </div>
  );

};

export default Home;
