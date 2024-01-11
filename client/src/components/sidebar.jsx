import { Link } from 'react-router-dom';

function Sidebar() {
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