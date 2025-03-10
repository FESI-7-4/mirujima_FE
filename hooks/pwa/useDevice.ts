import React from 'react';

const useDevice = () => {
  const [isIOS, setIsIOS] = React.useState(false);

  React.useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;

    setIsIOS(isIOSDevice);
  }, []);

  return { isIOS };
};

export default useDevice;
