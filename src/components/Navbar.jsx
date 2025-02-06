import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sample user data (Replace with Firebase Auth later)
  const user = {
    displayName: "John Doe",
    photoURL:
      "https://npr.brightspotcdn.com/dims4/default/d44fe82/2147483647/strip/true/crop/800x1200+0+0/resize/1760x2640!/format/webp/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fwvxu%2Ffiles%2F201703%2Fjim_parsons_big_bang_theory_2016.jpg", // Example image
  };

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
          {isLoggedIn && <Link to="/add-visa">Add Visa</Link>}
          {isLoggedIn && <Link to="/my-visas">My Added Visas</Link>}
          {isLoggedIn && <Link to="/my-applications">My Applications</Link>}

          {/* Conditional Login/Register */}
          {!isLoggedIn ? (
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
                onClick={() => setIsLoggedIn(false)}
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
          {isLoggedIn && (
            <Link to="/add-visa" onClick={() => setIsMenuOpen(false)}>
              Add Visa
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/my-visas" onClick={() => setIsMenuOpen(false)}>
              My Added Visas
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/my-applications" onClick={() => setIsMenuOpen(false)}>
              My Applications
            </Link>
          )}

          {/* Conditional Login/Register */}
          {!isLoggedIn ? (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                Register
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
