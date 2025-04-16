import { useState, useEffect, useRef } from 'react';
import { Menu, X, Moon, Sun, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement | null>(null);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
        setAvatarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">MyApp</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 text-gray-700 dark:text-gray-200 font-medium">
          <li><a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</a></li>
          <li><a href="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400">Dashboard</a></li>
          <li><a href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400">About</a></li>
          <div ref={avatarRef} className="relative">
            <button onClick={() => setAvatarOpen(!avatarOpen)} className="focus:outline-none">
              <img
                src="https://i.pravatar.cc/150?img=3"
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
            </button>
            <AnimatePresence>
              {avatarOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-40 p-2 bg-white dark:bg-gray-800 rounded shadow-xl text-sm text-gray-700 dark:text-gray-200"
                >
                  <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-2 py-1 cursor-pointer flex items-center gap-2">
                    <User size={16} /> Profile
                  </li>
                  <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-2 py-1 cursor-pointer flex items-center gap-2">
                    <LogOut size={16} /> Logout
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          <li>
            <button onClick={toggleDarkMode} className="hover:text-indigo-600 dark:hover:text-indigo-400">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-200">
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 dark:text-gray-200">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden px-4 pb-4"
          >
            <ul className="flex flex-col gap-4 text-gray-700 dark:text-gray-200 font-medium">
              <li><a href="/" className="block hover:text-indigo-600 dark:hover:text-indigo-400">Home</a></li>
              <li><a href="/dashboard" className="block hover:text-indigo-600 dark:hover:text-indigo-400">Dashboard</a></li>
              <li><a href="/about" className="block hover:text-indigo-600 dark:hover:text-indigo-400">About</a></li>
              <li className="border-t border-gray-200 dark:border-gray-700 pt-2">
                <a href="/logout" className="block text-red-500 hover:underline">Logout</a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
