import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Website Logo */}
        <Link to="/" className="text-2xl font-bold">
          Visa Navigator
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-6 items-center">
          <Link to="/">Home</Link>
          <Link to="/all-visas">All Visas</Link>
          {user && <Link to="/add-visa">Add Visa</Link>}
          {user && <Link to="/my-visas">My Added Visas</Link>}
          {user && <Link to="/my-applications">My Applications</Link>}

          {/* Conditional Login/Register */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="btn bg-white text-blue-500 px-4 py-1 rounded"
              >
                Login
              </Link>
            </>
          ) : (
            <div className="flex flex-col items-center relative group gap-2">
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <div className="absolute left-0 mt-2 w-40 bg-white text-black p-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                {user.displayName}
              </div>
              <button
                onClick={() => logoutUser()}
                className="btn ml-4 bg-red-500 px-4 py-1 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-2xl"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu (Slide-in) */}
      {isMenuOpen && (
        <div className=" flex flex-col items-center bg-blue-600 text-white p-4 mt-2">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/all-visas" onClick={() => setIsMenuOpen(false)}>
            All Visas
          </Link>
          {user && (
            <Link to="/add-visa" onClick={() => setIsMenuOpen(false)}>
              Add Visa
            </Link>
          )}
          {user && (
            <Link to="/my-visas" onClick={() => setIsMenuOpen(false)}>
              My Added Visas
            </Link>
          )}
          {user && (
            <Link to="/my-applications" onClick={() => setIsMenuOpen(false)}>
              My Applications
            </Link>
          )}

          {/* Conditional Login/Register */}
          {!user ? (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            </>
          ) : (
            <>
              <div className="text-center mt-2">
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-12 h-12 rounded-full mx-auto"
                />
                <p className="text-sm">{user.displayName}</p>
              </div>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="bg-red-500 px-4 py-1 rounded mt-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
