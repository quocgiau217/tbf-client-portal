import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { FaProjectDiagram } from 'react-icons/fa';
import { IoMdLogIn } from 'react-icons/io';
import { registerLicense } from '@syncfusion/ej2-base';

// Thay thế 'your-license-key' bằng key mà bạn đã nhận được từ Syncfusion
registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF1cXGJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXdceHZWQ2FeUUByWEQ=');

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col items-center bg-white">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center text-sm">
          <DeployButton />
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 p-2">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-6xl font-extrabold drop-shadow-lg">
          Welcome to TBF Client Portal
        </h1>
        <p className="text-2xl mt-4 drop-shadow-md max-w-2xl mx-auto">
          Manage and monitor your projects with ease and efficiency, all in one place.
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-3xl text-center">
        <div className="bg-gray-100 p-10 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Your Project Dashboard
          </h2>
          <p className="text-lg mb-10">
            Access all your ongoing projects, track progress, and stay updated with the latest
            developments.
          </p>
          <div className="flex justify-center space-x-8">
            <a
              href="/login"
              className="flex items-center px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              <IoMdLogIn className="mr-2" size={24} />
              Login to your Account
            </a>
            <a
              href="/dashboard/projects"
              className="flex items-center px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              <FaProjectDiagram className="mr-2" size={24} />
              View Your Projects
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-10 text-center text-sm text-gray-500">
        <p>© 2024 TBF Corporation. All rights reserved.</p>
      </footer>
    </div>
    </div>
  );
}
