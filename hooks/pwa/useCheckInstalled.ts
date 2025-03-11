import React from 'react';
import { PWA_STORAGE_KEY } from './usePWA';

interface Args {
  isInstallable: boolean;
  onReset: () => void;
}

const useCheckInstalled = ({ isInstallable, onReset }: Args) => {
  const [isAppUninstalled, setIsAppUninstalled] = React.useState(false);

  const checkInstalledApps = async () => {
    const isInstalled =
      localStorage.getItem(PWA_STORAGE_KEY) === 'true' ||
      window.matchMedia('(display-mode: standalone)').matches;

    setIsAppUninstalled(!isInstalled && isInstallable);
    if (!isInstalled && isInstallable) onReset();
  };

  React.useEffect(() => {
    checkInstalledApps();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkInstalledApps();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isInstallable]);

  return { isAppUninstalled };
};

export default useCheckInstalled;
