import VerifyOtpForm from '@/components/VerifyOTP';
import { Suspense } from 'react';

const VerifyOtpPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex w-full justify-center p-8 text-sm text-muted-foreground">
          Loading verification...
        </div>
      }
    >
      <VerifyOtpForm />
    </Suspense>
  );
};

export default VerifyOtpPage;
