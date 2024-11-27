import { createClient } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation';

type TopBarProps = {
  user: {
    email: string;
    [key: string]: any;
  } | null;
  role: string | null;
};

const TopBar: React.FC<TopBarProps> = ({ user, role }) => {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login'); // Chuyển hướng về trang login sau khi logout
  };

  return (
    <header className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <p>
              Hey, {user.email}! {role && <span className="text-gray-400">({role})</span>}
            </p>
            <button
              onClick={handleSignOut}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <p>No user logged in</p>
        )}
      </div>
    </header>
  );
};

export default TopBar;
