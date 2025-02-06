"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminPanel from '../../components/AdminPanel';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/check-auth');
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // This will prevent any flicker before redirect
  }

  return <AdminPanel />;
}