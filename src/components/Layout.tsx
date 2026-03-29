import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithGoogle, logOut } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LogOut, User, Compass, LayoutDashboard, MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] font-sans">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white group-hover:rotate-6 transition-transform">
              <Compass size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-indigo-900">SkillDiscovery</span>
          </Link>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-indigo-600 flex items-center gap-1.5">
                  <LayoutDashboard size={18} />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <Link to="/chat" className="text-sm font-medium text-gray-600 hover:text-indigo-600 flex items-center gap-1.5">
                  <MessageSquare size={18} />
                  <span className="hidden sm:inline">AI Mentor</span>
                </Link>
                <div className="h-6 w-px bg-gray-200 mx-2" />
                <button 
                  onClick={() => logOut()}
                  className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-100">
                  <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt="User" referrerPolicy="no-referrer" />
                </div>
              </>
            ) : (
              <button 
                onClick={handleLogin}
                className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-top border-gray-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© 2026 SkillDiscovery. Empowering the next generation.</p>
        </div>
      </footer>
    </div>
  );
}
