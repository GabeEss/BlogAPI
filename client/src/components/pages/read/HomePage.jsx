import { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get('/blog')
      .then(response => { 
        setData(response.data);
    })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>{data.title}</h1>
      {data.c_user && <p>User: {data.c_user}</p>}
      {data.latestPost ? (
        <div>
          <h2>{data.latestPost.title}</h2>
          <p>{data.latestPost.text}</p>
        </div>
      ) : (
        <p>No latest post available.</p>
      )}
    </div>
  );
}

export default HomePage;