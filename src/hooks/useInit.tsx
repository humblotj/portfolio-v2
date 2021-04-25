import { useEffect, useState } from 'react';

const useInit = () => {
  const [isInit, setIsInit] = useState(false);
  useEffect(() => setIsInit(true), []);

  return isInit;
};

export default useInit;
