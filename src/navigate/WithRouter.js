import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const WithRouter = (Component) => {
  // Define a functional component that uses hooks correctly
  const ComponentWithRouter = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    // Pass the hook values as props to the wrapped component
    return (
      <Component
        {...props}
        navigate={navigate}
        params={params}
        location={location}
      />
    );
  };

  return ComponentWithRouter;
};

export default WithRouter;
