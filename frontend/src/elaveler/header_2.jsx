import React, { useState } from 'react';
import { Home, User, BookOpen, Mail, Globe, UserCircle2, Check } from 'lucide-react';

const Header = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' }
  ];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.name);
    setIsLanguageOpen(false);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
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
        <div className="relative">
          <button 
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="flex items-center bg-gray-100 p-2 rounded-full hover:bg-gray-200"
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
        
        <div className="relative group">
          <UserCircle2 
            size={40} 
            className="text-gray-600 hover:text-blue-600 cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;