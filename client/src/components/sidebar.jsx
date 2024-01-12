import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/LoginContext';

function Sidebar() {
  const { loggedIn } = useContext(AuthContext);
    return (
      <div className="sidebar">
        <ul>
          {loggedIn ? (
            <li>Hello, blogger. Log out forthcoming.</li>
          ) : <li><Link to="/blog/poster/login">Login</Link></li> } 
          <li><Link to="/blog">Home</Link></li>
          <li><Link to="/blog/posts">Posts</Link></li>
        </ul>
      </div>
    );
  }

  export default Sidebar;
