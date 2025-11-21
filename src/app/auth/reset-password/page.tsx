import { Suspense } from 'react';
import ResetPasswordForm from '@/components/ResetPasswordForm';

const ResetPasswordPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex w-full justify-center p-8 text-sm text-muted-foreground">
          Loading reset form...
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;
