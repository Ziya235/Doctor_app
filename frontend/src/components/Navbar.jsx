import React, { useState, useEffect, useRef } from 'react';
import { Home, User, BookOpen, Mail, Globe, UserCircle2, Check, UserIcon, LogOutIcon } from 'lucide-react';

const Navbar = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Az');

  const languageRef = useRef(null);
  const profileRef = useRef(null);

  const languages = [
    { code: 'Az', name: 'Azərbaycan' },
    { code: 'En', name: 'English' },
    { code: 'Ru', name: 'Rus' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        languageRef.current && 
        !languageRef.current.contains(event.target)
      ) {
        setIsLanguageOpen(false);
      }

      if (
        profileRef.current && 
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.code);
    setIsLanguageOpen(false);
  };

  const handleLogout = () => {
    console.log('Logging out');
  };

  return (
    <header className="flex justify-between items-center p-4 px-16 mb-8 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <img 
          src="/api/placeholder/50/50" 
          alt="Logo" 
          className="h-10 w-10 rounded-full"
        />
        <h1 className="text-xl font-bold text-gray-800">School Platform</h1>
      </div>

      {/* Navigation */}
      <nav className="flex space-x-6">
        <a href="/" className="flex items-center text-gray-700 hover:text-blue-600">
          <Home className="mr-2" size={20} />
          Home
        </a>
        <a href="/about" className="flex items-center text-gray-700 hover:text-blue-600">
          <BookOpen className="mr-2" size={20} />
          About
        </a>
        <a href="/contact" className="flex items-center text-gray-700 hover:text-blue-600">
          <Mail className="mr-2" size={20} />
          Contact
        </a>
        <a href="/teachers" className="flex items-center text-gray-700 hover:text-blue-600">
          <User className="mr-2" size={20} />
          Teachers
        </a>
      </nav>

      {/* Language & Profile */}
      <div className="flex items-center space-x-4 relative">
        {/* Language Dropdown */}
        <div className="relative" ref={languageRef}>
          <button 
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="flex items-center bg-gray-100 p-2 pr-3 rounded-full hover:bg-gray-200"
          >
            <Globe className="mr-2" size={20} />
            {selectedLanguage}
          </button>
          
          {isLanguageOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              {languages.map((lang) => (
                <div 
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang)}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {selectedLanguage === lang.name && (
                    <Check className="mr-2 text-green-500" size={16} />
                  )}
                  {lang.name}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <UserCircle2 
            size={40} 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="text-gray-600 hover:text-blue-600 cursor-pointer"
          />
          
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <div 
                onClick={() => {/* Navigate to profile */}}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              >
                <UserIcon className="mr-2" size={16} />
                My Profile
              </div>
              <div 
                onClick={handleLogout}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer text-red-500"
              >
                <LogOutIcon className="mr-2" size={16} />
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;