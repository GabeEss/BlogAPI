import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [data, setData] = useState({});
  
  useEffect(() => {
    fetch("/blog")
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/blog">Home</Link></li>
        <li><Link to="/blog/posts">Posts</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;