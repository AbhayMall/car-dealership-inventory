import {
  Car,
  GitFork,
  Mail,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-gray-950 text-gray-300">

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-2">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Car size={22} />
              </div>

              <span className="text-xl font-bold text-white">
                AutoVault
              </span>

            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
              A modern car dealership inventory platform
              for discovering, managing, and purchasing
              vehicles with ease.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="font-semibold text-white">
              Quick Links
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">

              <a
                href="/"
                className="hover:text-white"
              >
                Home
              </a>

              <a
                href="/inventory"
                className="hover:text-white"
              >
                Inventory
              </a>

              <a
                href="/search"
                className="hover:text-white"
              >
                Search
              </a>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="font-semibold text-white">
              Get In Touch
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">

              <p className="flex items-center gap-2">
                <Mail size={16} />
                abhaymall9305@gmail.com
              </p>

              <p className="flex items-center gap-2">
                <GitFork size={16} />
                GitHub Project
              </p>

            </div>

          </div>

        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">

          © {new Date().getFullYear()} AutoVault.
          

        </div>

      </div>

    </footer>
  );
};

export default Footer;