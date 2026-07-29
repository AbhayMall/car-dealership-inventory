import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Car,
  CheckCircle,
} from "lucide-react";

import Input from "../components/Input";
import Button from "../components/Button";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Register = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
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

      await api.post(
        "/auth/register",
        formData
      );

      // auto-login and go to dashboard
      try {
        await login(formData.email, formData.password);
        navigate("/dashboard", { replace: true });
      } catch (err) {
        // fallback to login page
        navigate("/login");
      }

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50">

      <div className="mx-auto grid min-h-[700px] max-w-7xl lg:grid-cols-2">

        {/* Left Side */}

        <div className="hidden bg-gray-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">

          <div>

            <Link
              to="/"
              className="flex items-center gap-2"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                <Car size={22} />
              </div>

              <span className="text-xl font-bold">
                AutoVault
              </span>

            </Link>

            <div className="mt-24">

              <h1 className="text-4xl font-bold leading-tight">
                Start your journey
                <br />
                with AutoVault.
              </h1>

              <p className="mt-6 max-w-md leading-7 text-gray-400">
                Create your account and explore a smarter
                way to discover your next vehicle.
              </p>

            </div>

          </div>

          <div className="space-y-4">

            <Benefit text="Browse available vehicles" />

            <Benefit text="Search and filter inventory" />

            <Benefit text="Purchase vehicles online" />

          </div>

        </div>

        {/* Form */}

        <div className="flex items-center justify-center p-6 sm:p-12">

          <div className="w-full max-w-md">

            <div className="mb-8">

              <h2 className="text-3xl font-bold text-gray-900">
                Create your account
              </h2>

              <p className="mt-2 text-gray-600">
                Join AutoVault today.
              </p>

            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />

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
                placeholder="Create a password"
                required
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </Button>

            </form>

            <p className="mt-6 text-center text-sm text-gray-600">

              Already have an account?

              <Link
                to="/login"
                className="ml-1 font-semibold text-blue-600 hover:text-blue-700"
              >
                Sign in
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

const Benefit = ({
  text,
}) => {
  return (
    <div className="flex items-center gap-3">

      <CheckCircle
        size={20}
        className="text-blue-500"
      />

      <span className="text-gray-300">
        {text}
      </span>

    </div>
  );
};

export default Register;