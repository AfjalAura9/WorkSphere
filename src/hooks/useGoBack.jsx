// src/hooks/useGoBack.js
import { useNavigate } from 'react-router-dom';

const useGoBack = (fallbackPath = '/') => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(fallbackPath, { replace: true });
    }
  };

  return goBack;
};

export default useGoBack;
