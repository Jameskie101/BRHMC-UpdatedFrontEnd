import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/core/redux/authSlice';
import ALLRoutes from '@/routes/router';

function App() {
  const dispatch = useDispatch();
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const roleLevelStr = localStorage.getItem('roleLevel');

    if (token && roleLevelStr) {
      const roleLevel = parseInt(roleLevelStr, 10);
      dispatch(setCredentials({ token, roleLevel }));
    }
    setIsRestoring(false);
  }, [dispatch]);

  if (isRestoring) {
    // Optional: show a loading spinner while restoring
    return <div className="d-flex justify-content-center mt-5">Loading...</div>;
  }

  return <ALLRoutes />;
}

export default App;