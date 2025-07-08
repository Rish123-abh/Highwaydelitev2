import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const hasHandled = useRef(false); 

  useEffect(() => {
    if (hasHandled.current) return;

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userRaw = params.get('user');

    if (token && userRaw) {
      const user = JSON.parse(decodeURIComponent(userRaw));
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      hasHandled.current = true;
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      Logging in with Google...
    </div>
  );
};

export default AuthSuccess;
