import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  // Lấy thông tin người dùng hiện tại
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let role = null;

  // Nếu người dùng tồn tại, lấy vai trò của họ từ bảng user_roles
  if (user) {
    const { data: userRole, error } = await supabase
      .from('user_roles')
      .select('roles_name')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching user role:', error);
    } else {
      role = userRole ? userRole.roles_name : 'No role';
    }
  }

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex text-black items-center gap-4">
      Hey, {user.email}! {role && <span className="text-gray-500">({role})</span>}
      <form action={signOut}>
        <button className="py-2 px-4 text-white rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Link
        href="/login"
        className="h-8 flex items-center justify-center rounded-md no-underline bg-black text-sm font-medium px-4"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="h-8 flex items-center justify-center rounded-md no-underline bg-black text-white text-sm font-medium px-4"
      >
        Sign up
      </Link>
    </div>
  );
}
