import { Link } from "react-router-dom";

import {
  ArrowRight,
  Car,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}

      <section className="relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.25),transparent_40%)]" />

        <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* Hero Content */}

          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-gray-300">
              <Sparkles size={16} className="text-blue-400" />
              Your journey starts here
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
              Find the car that
              <span className="text-blue-500"> fits your journey.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
              Explore our curated inventory of quality vehicles, compare your
              options, and find your perfect car with a simple and seamless
              experience.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/inventory"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Explore Inventory
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl border border-gray-700 px-6 py-3.5 font-semibold text-white transition hover:bg-gray-900"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* Hero Visual */}

          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              {/* Background glow */}
              <div className="absolute inset-10 rounded-full bg-blue-600/20 blur-3xl" />

              {/* Car Image */}
              <img
                src="/images/car.png"
                alt="Car Inventory"
                className="relative z-10 mx-auto w-[950px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold text-blue-600">WHY CarNova</p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything you need to find your next car
            </h2>

            <p className="mt-4 text-gray-600">
              We've designed the experience to make finding and managing
              vehicles simple.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<Search />}
              title="Smart Search"
              description="Find vehicles quickly using make, model, category, and price filters."
            />

            <FeatureCard
              icon={<ShieldCheck />}
              title="Trusted Inventory"
              description="Browse available vehicles with clear stock information and details."
            />

            <FeatureCard
              icon={<Users />}
              title="Simple Experience"
              description="Create an account, explore inventory, and purchase vehicles with ease."
            />
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="bg-blue-600">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-16 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Ready to find your next vehicle?
            </h2>

            <p className="mt-2 text-blue-100">
              Explore our inventory and discover your perfect match.
            </p>
          </div>

          <Link
            to="/inventory"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            View Inventory
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-bold text-gray-900">{title}</h3>

      <p className="mt-3 leading-7 text-gray-600">{description}</p>
    </div>
  );
};

export default Home;
