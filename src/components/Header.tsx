import { useState,  FormEvent } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {FaTv,  FaUser, FaSearch } from 'react-icons/fa';
import HamburgerIcon from './HamburgerIcon';

const navigation = [
  {
    label: 'Favorites',
    href: '/favorites',
    icon: <FaTv className="mr-2"/>
  }
];

const Header = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);

  const handleSearch = () => {
    console.log('clicked')
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleNavClick = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-neutral-600 bg-opacity-75 z-50">
      <div className="container mx-auto px-4 flex items-center h-full relative">
        {/* Logo */}
        <Link to="/" className="text-white text-xl font-bold">
          <h1 className="text-white text-xl font-bold">MOVIE</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-6 gap-4 hidden lg:flex">
          {navigation.map((nav, index) => (
            <NavLink
              key={index}
              to={nav.href}
              className="text-white text-lg hover:text-yellow-400 transition-colors px-2"
            >
              {nav.label}
            </NavLink>
          
          ))}
        </nav>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-4">
          {/* Search Bar (Visible on Desktop) */}
          <form onSubmit={handleSubmit} className="hidden lg:flex items-center">
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent px-4 py-2 outline-none border rounded-md   border-gray-400  text-white placeholder-gray-300"
              onChange={(e) => setSearchInput(e.target.value)}
              onMouseEnter={handleSearch}
              value={searchInput}
            />
            <button onClick={handleSearch} className="text-white text-2xl ml-2">
              <FaSearch />
            </button>
          </form>
          

          <div className="flex flex-col items-center pt-16 lg:hidden">
            {/* Mobile Search Bar */}
            <form onSubmit={handleSubmit} className="flex items-center w-full px-4 mb-14">
              <input
                type="text"
                placeholder="Search..."
                className=" text-white px-4 py-2 w-full border-b border-gray-400 focus:outline-none"
              onMouseEnter={handleSearch}
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
              />
              <button onClick={handleSearch}  className="text-white text-2xl ml-2">
                <FaSearch />
              </button>
            </form>

        </div>

          {/* User Icon */}
          <FaUser className="text-white text-3xl cursor-pointer active:scale-50 transition-transform" />

          {/* Hamburger Icon (Mobile Menu Toggle) */}
          <div className="lg:hidden cursor-pointer z-50" onClick={handleNavClick}>
            <HamburgerIcon isOpen={navOpen} />
          </div>
        </div>

        
        {/* Mobile Navigation Menu */}

        <div
          className={`fixed top-0 right-0 h-full w-64 bg-neutral-800 shadow-lg transform transition-transform duration-300 ${
            navOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col items-center pt-16">
            {navigation.map((nav, index) => (
              <NavLink
                key={index}
                to={nav.href}
                className="text-white text-lg py-4 w-full text-center border-b border-gray-600 hover:bg-gray-700 transition"
                onClick={() => setNavOpen(false)}
              >
                {nav.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
