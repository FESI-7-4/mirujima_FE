import React from 'react';

interface RelatedApplication {
  id: string;
  platform: string;
  url: string;
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Navigator {
    getInstalledRelatedApps: () => Promise<RelatedApplication[]>;
  }
}

interface Args {
  appId: string;
  isInstallable: boolean;
  onReset: () => void;
}

const useCheckInstalled = ({ appId, isInstallable, onReset }: Args) => {
  const [isAppUninstalled, setIsAppUninstalled] = React.useState(false);

  const checkInstalledApps = async () => {
    if (!('getInstalledRelatedApps' in navigator)) return;

    try {
      const relatedApps = await navigator.getInstalledRelatedApps();
      if (Array.isArray(relatedApps)) {
        const isAppInstalled = relatedApps.some((app) => app.id === appId);
        if (!isAppInstalled && isInstallable) {
          setIsAppUninstalled(true);
          onReset();
        }
      }
    } catch (error) {
      console.error('Failed to check installed apps:', error);
    }
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
