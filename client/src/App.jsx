import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Header from './components/header';
import MainDisplay from './components/main';
import HomePage from './components/pages/read/HomePage';
import PostListPage from './components/pages/read/PostListPage';
import PostPage from './components/pages/read/PostPage';
import CommentPage from './components/pages/read/CommentPage';
import { AuthProvider } from './contexts/LoginContext';
import { ErrorProvider } from './contexts/ErrorContext';
import LoginPage from './components/pages/read/LoginPage';
import NewPostPage from './components/pages/create/NewPostPage';
// import NewCommentPage from './components/pages/create/NewCommentPage';
// import EditPostPage from './components/pages/update/EditPostPage';
// import DeletePostPage from './components/pages/delete/DeletePostPage';
// import DeleteCommentPage from './components/pages/delete/DeleteCommentPage';

function App() {
  return (
    <Router>
      <ErrorProvider>
        <AuthProvider>
          <div className="App">
            <Header />
            <div className="content">
              <Sidebar />
              <MainDisplay>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/blog" element={<HomePage />} />
                  <Route path="/blog/posts" element={<PostListPage />} />
                  <Route path="/blog/post/:id" element={<PostPage />} />
                  <Route path="/blog/comment/:id/" element={<CommentPage />} />
                  <Route path="/blog/poster/login" element={<LoginPage />} />
                  <Route path="/blog/post/create" element={<NewPostPage />} />
                  {/* <Route path="/blog/post/:id/create" element={<NewCommentPage />} /> */}
                  {/* <Route path="/blog/post/:id/update" element={<EditPostPage />} />
                  <Route path="/blog/post/:id/delete" element={<DeletePostPage />} />
                  <Route path="/blog/comment/:id/delete" element={<DeleteCommentPage />} /> */}
                </Routes>
              </MainDisplay>
            </div>
          </div>
        </AuthProvider>
      </ErrorProvider>
    </Router>
  );
}

export default App;