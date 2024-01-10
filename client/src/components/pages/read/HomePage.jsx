import { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  const [data, setData] = useState({});

  useEffect(() => {
    // Replace '/api/index' with the actual path to your endpoint
    axios.get('/blog')
      .then(response => { 
        setData(response.data);
        console.log(response.data);
    })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>{data.title}</h1>
      {data.c_user && <p>User: {data.c_user}</p>}
      {data.latestPost && (
        <div>
          <h2>{data.latestPost.title}</h2>
          <p>{data.latestPost.text}</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;