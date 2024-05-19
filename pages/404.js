import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);

  return null; // Return null as this page will be redirected
};

export default Custom404;
