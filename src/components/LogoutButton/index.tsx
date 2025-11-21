'use client';

import { protectedRoutes } from '@/constants';
import { useUser } from '@/context/UserContext';
import { logOut } from '@/services/Auth';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
  const { setUser, setIsLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  // logout function
  const handleLogout = async () => {
    await logOut();
    setIsLoading(true);
    setUser(null);

    if (protectedRoutes.some(route => pathname.match(route))) {
      router.push(`/auth/login?redirectPath=${pathname}`);
      // router.push('/auth/login');
    }
  };
  return (
    <div>
      <Button
        onClick={handleLogout}
        className="flex w-full items-center justify-center gap-2 rounded-full"
      >
        <LogOut className="size-4" />
        Sign out
      </Button>
    </div>
  );
};

export default LogoutButton;
