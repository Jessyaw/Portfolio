import { useNavigate, useParams, useLocation } from 'react-router-dom';

const WithRouter = (Component) => {
  const ComponentWithRouter = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

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
