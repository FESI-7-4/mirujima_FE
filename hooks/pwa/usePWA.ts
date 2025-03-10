import React from 'react';
import useDevice from './useDevice';
import useCheckInstalled from './useCheckInstalled';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
  prompt(): Promise<void>;
}

const usePWA = () => {
  const [isInstallable, setIsInstallable] = React.useState(false);
  const [deferredPrompt, setDeferredPrompt] = React.useState<BeforeInstallPromptEvent | null>(null);
  const { isIOS } = useDevice();

  const resetInstallState = () => {
    localStorage.removeItem('pwa-installed');
    localStorage.removeItem('pwa-install-time');
    setIsInstallable(true);
  };

  const { isAppUninstalled } = useCheckInstalled(isInstallable, resetInstallState);

  React.useEffect(() => {
    const checkInitialInstall = () => {
      const isInstalled = localStorage.getItem('pwa-installed') === 'true';
      if (!isInstalled) {
        setIsInstallable(true);
      }
    };

    checkInitialInstall();
    if (!isIOS) {
      const beforeInstallHandler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setIsInstallable(true);
      };

      const appInstalledHandler = () => {
        localStorage.setItem('pwa-installed', 'true');
        localStorage.setItem('pwa-install-time', Date.now().toString());
        setIsInstallable(false);
        setDeferredPrompt(null);
      };

      window.addEventListener('beforeinstallprompt', beforeInstallHandler as EventListener);
      window.addEventListener('appinstalled', appInstalledHandler);

      return () => {
        window.removeEventListener('beforeinstallprompt', beforeInstallHandler as EventListener);
        window.removeEventListener('appinstalled', appInstalledHandler);
      };
    }
  }, [isIOS]);

  React.useEffect(() => {
    if (isAppUninstalled) {
      resetInstallState();
    }
  }, [isAppUninstalled]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      const promptEvent = deferredPrompt;
      promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      if (outcome === 'accepted') {
        localStorage.setItem('pwa-installed', 'true');
        localStorage.setItem('pwa-install-time', Date.now().toString());
        setIsInstallable(false);
      } else {
        resetInstallState();
      }
    }
  };

  return {
    isInstallable,
    deferredPrompt,
    isIOS,
    handleInstall
  };
};

export default usePWA;
