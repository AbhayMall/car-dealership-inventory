import {
  Car,
  GitFork,
  Mail,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-brand text-white">

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-2">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <Car size={22} />
              </div>

              <span className="text-xl font-bold text-white">
                AutoVault
              </span>

            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/80">
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
                support@autovault.com
              </p>

              <p className="flex items-center gap-2">
                <GitFork size={16} />
                GitHub Project
              </p>

            </div>

          </div>

        </div>

        <div className="mt-10 border-t border-border/30 pt-6 text-center text-sm text-white/70">

          © {new Date().getFullYear()} AutoVault.
          Built with React and Node.js.

        </div>

      </div>

    </footer>
  );
};

export default Footer;