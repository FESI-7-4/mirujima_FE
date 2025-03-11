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
  const { isIOS, isInApp } = useDevice();

  const resetInstallState = React.useCallback(() => {
    localStorage.removeItem('mirujima-app-installed');
    setIsInstallable(true);
  }, []);

  useCheckInstalled(isInstallable, resetInstallState);

  React.useEffect(() => {
    const checkInitialInstall = () => {
      const isInstalled = localStorage.getItem('mirujima-app-installed') === 'true';
      if (!isInstalled && !isInApp) setIsInstallable(true);
    };

    checkInitialInstall();
    if (!isIOS && !isInApp) {
      const beforeInstallHandler = (e: BeforeInstallPromptEvent) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setIsInstallable(true);
      };

      const appInstalledHandler = () => {
        localStorage.setItem('mirujima-app-installed', 'true');
        setDeferredPrompt(null);
        setIsInstallable(false);
      };

      window.addEventListener('beforeinstallprompt', beforeInstallHandler as EventListener);
      window.addEventListener('appinstalled', appInstalledHandler);

      return () => {
        window.removeEventListener('beforeinstallprompt', beforeInstallHandler as EventListener);
        window.removeEventListener('appinstalled', appInstalledHandler);
      };
    }
  }, [isIOS, isInApp]);

  const handleInstall = React.useCallback(async () => {
    if (deferredPrompt) {
      const promptEvent = deferredPrompt;
      promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      if (outcome === 'accepted') {
        localStorage.setItem('mirujima-app-installed', 'true');
        setIsInstallable(false);
      } else {
        resetInstallState();
      }
    }
  }, [deferredPrompt]);

  return {
    isInstallable,
    deferredPrompt,
    isIOS,
    handleInstall
  };
};

export default usePWA;
