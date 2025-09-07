import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <section className="flex min-h-screen w-full items-center justify-center bg-dark-1">
          <div className="w-full max-w-md p-6">
            <Outlet />
          </div>
        </section>
      )}
    </>
  );
};

export default AuthLayout;
