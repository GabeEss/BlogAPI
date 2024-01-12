import { createContext, useState } from 'react';

export const ErrorContext = createContext();

// eslint-disable-next-line react/prop-types
const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export { ErrorProvider };