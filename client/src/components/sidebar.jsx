import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/LoginContext';

function Sidebar() {
  const { loggedIn, logout } = useContext(AuthContext);

  function handleLogout(event) {
    event.preventDefault();
    logout();
  }

    return (
      <div className="sidebar">
        <ul>
          {loggedIn ? (
            <>
              <li><button onClick={handleLogout}>Logout</button></li>
              <li><Link to="/blog/post/create">New Post</Link></li>
            </>
          ) : <li><Link to="/blog/poster/login">Login</Link></li> } 
          <li><Link to="/blog">Home</Link></li>
          <li><Link to="/blog/posts">Posts</Link></li>
        </ul>
      </div>
    );
  }

  export default Sidebar;
