import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  Car,
  LogOut,
  LayoutDashboard,
  Search,
  Menu,
  X,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  useAuth,
} from "../context/AuthContext";

const Navbar = () => {
  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `transition-colors ${
      isActive
        ? "text-blue-600 font-semibold"
        : "text-gray-600 hover:text-blue-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Car size={22} />
          </div>

          <div>
            <h1 style={{ fontFamily: "Poppins, sans-serif" }} className="text-xl font-bold text-black">
              AutoVault
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              Car Dealership
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}

        <div className="hidden items-center gap-6 md:flex">

          <NavLink
            to="/"
            className={navLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/inventory"
            className={navLinkClass}
          >
            Inventory
          </NavLink>

          {isAuthenticated && (
            <NavLink
              to="/search"
              className={navLinkClass}
            >
              <span className="flex items-center gap-1">
                <Search size={17} />
                Search
              </span>
            </NavLink>
          )}

          {isAuthenticated && (
            <NavLink
              to="/dashboard"
              className={navLinkClass}
            >
              <span className="flex items-center gap-1">
                <LayoutDashboard size={17} />
                Dashboard
              </span>
            </NavLink>
          )}

          {isAuthenticated && (
            <NavLink
              to="/profile"
              className={navLinkClass}
            >
              Profile
            </NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={navLinkClass}
            >
              Admin
            </NavLink>
          )}

        </div>

        {/* Desktop Auth */}

        <div className="hidden items-center gap-3 md:flex">

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {user?.name}
                </p>

                <p className="text-xs capitalize text-gray-500">
                  {user?.role}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-red-600"
              >
                <LogOut size={17} />
                Logout
              </button>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() =>
            setIsMenuOpen(!isMenuOpen)
          }
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
        >
          {isMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </nav>

      {/* Mobile Menu */}

      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-6 py-6 md:hidden">

          <div className="flex flex-col gap-4">

            <NavLink
              to="/"
              onClick={() =>
                setIsMenuOpen(false)
              }
              className={navLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/inventory"
              onClick={() =>
                setIsMenuOpen(false)
              }
              className={navLinkClass}
            >
              Inventory
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink
                  to="/search"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className={navLinkClass}
                >
                  Search
                </NavLink>

                <NavLink
                  to="/dashboard"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className={navLinkClass}
                >
                  Dashboard
                </NavLink>
              </>
            )}

            {user?.role === "admin" && (
              <NavLink
                to="/admin"
                onClick={() =>
                  setIsMenuOpen(false)
                }
                className={navLinkClass}
              >
                Admin Dashboard
              </NavLink>
            )}

            {!isAuthenticated ? (
              <div className="flex flex-col gap-2 border-t pt-4">

                <Link
                  to="/login"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className="rounded-lg px-4 py-2 text-center font-medium text-gray-700 hover:bg-gray-100"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className="rounded-lg bg-blue-600 px-4 py-2 text-center font-semibold text-white"
                >
                  Get Started
                </Link>

              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2 font-medium text-red-600"
              >
                <LogOut size={17} />
                Logout
              </button>
            )}

          </div>

        </div>
      )}

    </header>
  );
};

export default Navbar;