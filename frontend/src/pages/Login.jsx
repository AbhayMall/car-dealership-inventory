import {
  useState,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Car,
  LogIn,
} from "lucide-react";

import Input from "../components/Input";
import Button from "../components/Button";

import {
  useAuth,
} from "../context/AuthContext";

const Login = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const {
    login,
  } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    setLoading(true);

    try {

      await login(
        formData.email,
        formData.password
      );

      const destination =
        location.state?.from?.pathname ||
        "/dashboard";

      navigate(destination, {
        replace: true,
      });

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Invalid email or password."
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 px-4 py-12">

      <div className="w-full max-w-md">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">

          {/* Logo */}

          <div className="mb-8 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <Car size={28} />
            </div>

            <h1 className="mt-5 text-3xl font-bold text-gray-900">
              Welcome back
            </h1>

            <p className="mt-2 text-gray-600">
              Sign in to continue to AutoVault.
            </p>

          </div>

          {/* Error */}

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >

              {loading ? (
                "Signing In..."
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn size={18} />
                  Sign In
                </span>
              )}

            </Button>

          </form>

          {/* Register */}

          <p className="mt-6 text-center text-sm text-gray-600">

            Don't have an account?

            <Link
              to="/register"
              className="ml-1 font-semibold text-blue-600 hover:text-blue-700"
            >
              Create one
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;
