import React from 'react';
import useDevice from './useDevice';
import useCheckInstalled from './useCheckInstalled';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
  prompt(): Promise<void>;
}

export const PWA_STORAGE_KEY = 'mirujima-app-installed';

const usePWA = () => {
  const [isInstallable, setIsInstallable] = React.useState(false);
  const [deferredPrompt, setDeferredPrompt] = React.useState<BeforeInstallPromptEvent | null>(null);
  const { isIOS, isInApp } = useDevice();

  const resetInstallState = React.useCallback(() => {
    localStorage.removeItem(PWA_STORAGE_KEY);
    setIsInstallable(true);
  }, []);

  useCheckInstalled({ isInstallable, onReset: resetInstallState });

  React.useEffect(() => {
    const checkInitialInstall = () => {
      const isInstalled = localStorage.getItem(PWA_STORAGE_KEY) === 'true';
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
        localStorage.setItem(PWA_STORAGE_KEY, 'true');
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
        localStorage.setItem(PWA_STORAGE_KEY, 'true');
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
