import { useCallback, useEffect } from 'react';

import { deleteCookie, getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';

import { useInfoStore } from '../../stores/infoStore';

export default function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const { id, email, name, setInfo, logout } = useInfoStore();

  const checkAuth = useCallback(() => {
    const token = getCookie('accessToken');

    if (!token) {
      logout();
    }
  }, [logout]);

  useEffect(() => {
    checkAuth();
  }, [pathname, checkAuth]);

  const isLoggedIn = id !== null;

  const handleLogout = () => {
    deleteCookie('accessToken');

    logout();
    router.push('/login');
  };

  return {
    isLoggedIn,
    user: { id, email, name },
    checkAuth,
    handleLogout
  };
}
