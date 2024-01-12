import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './LoginContext';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/blog" />
        )
      }
    />
  );
};

export default ProtectedRoute;