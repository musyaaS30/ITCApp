import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-surface-1 flex flex-col justify-center items-center py-12 px-4">
      <div className="w-full max-w-md bg-canvas border border-hairline p-8">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-block text-ink font-semibold text-[20px] mb-2">ITC System</Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
