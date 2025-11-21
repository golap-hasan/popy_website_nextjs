import LoginForm from '@/components/LoginForm';

const LoginPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ redirectPath: string }>;
}) => {
  const { redirectPath } = await searchParams;

  return (
    <div>
      <LoginForm redirectPath={redirectPath} />
    </div>
  );
};

export default LoginPage;
