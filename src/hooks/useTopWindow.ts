import { useEffect, useState } from 'react';

function useTopWindow() {
  const [isTop, setIsTop] = useState<boolean>(true);

  useEffect(() => {
    setIsTop(window === window.top);
  }, []);

  return isTop;
}

export default useTopWindow;
