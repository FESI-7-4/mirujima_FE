import React from 'react';

const useDevice = () => {
  const [isIOS, setIsIOS] = React.useState(false);
  const [isInApp, setIsInApp] = React.useState(false);

  React.useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    const isUsingApp = window.matchMedia('(display-mode: standalone)').matches;
    setIsInApp(isUsingApp);
  }, []);

  return { isIOS, isInApp };
};

export default useDevice;
