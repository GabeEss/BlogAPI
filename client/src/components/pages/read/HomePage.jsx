import { useState, useEffect } from 'react';
import custom from '../../../../axios-custom';

function HomePage() {
  const [data, setData] = useState({});

  useEffect(() => {
    custom.get('/blog')
      .then(response => { 
        setData(response.data);
    })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>{data.title}</h1>
      {data.latestPost ? (
        <div>
          <h2>{data.latestPost.title}</h2>
          <p>{data.latestPost.text}</p>
          <p>Written at: {data.latestPost.timestamp}</p>
        </div>
      ) : (
        <p>No latest post available.</p>
      )}
    </div>
  );
}

export default HomePage;