
'use client';

import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm />
        <Footer />
      </div>
    </div>
  );
}
