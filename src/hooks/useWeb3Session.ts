import {
  useSession,
  signIn as signInSession,
  signOut as signOutSession,
} from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { getWalletAddress } from '@/util/web3';
import { done, start } from 'nprogress';

const { ethereum } = (global.window as any) ?? {};

const signOut = async () => {
  start();
  await signOutSession();
  done();
};

const useWeb3Session = () => {
  const { data, status } = useSession();
  const [address, setAddress] = useState<string | null>();

  useEffect(() => {
    setAddress(
      data && data.user && (data.user as any).address
        ? String((data.user as any).address)
        : null
    );
  }, [data]);

  useEffect(() => {
    const func = async ([newAddress]: [string]) => {
      start();
      if (newAddress) {
        await signInSession('credentials', {
          redirect: false,
          address: newAddress,
        });
      } else {
        await signOutSession();
      }
      done();
      setAddress(newAddress);
    };
    ethereum?.on('accountsChanged', func);

    return () => ethereum?.removeListener('accountsChanged', func);
  }, []);

  const signIn = useCallback(async () => {
    if (status === 'unauthenticated') {
      const signInAddress = address || (await getWalletAddress());
      start();
      await signInSession('credentials', {
        redirect: false,
        address: signInAddress,
      });
      done();
    }
  }, [address, status]);

  return { signIn, signOut, address, status };
};

export default useWeb3Session;
