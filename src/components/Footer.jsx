import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-6 mt-10">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-4">
          {/* Website Name */}
          <div className="flex items-center justify-center">
            <h2 className="text-2xl font-bold mb-2">Visa Navigator</h2>
          </div>

          {/* Contact Information */}
          <div>
            <p>Email: visa@navigator.com</p>
            <p>Phone: +8801613870675 </p>
            <p>Address: H/Ka, Baridhara DHOS, Bangladesh</p>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center gap-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-2xl hover:text-blue-400" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-2xl hover:text-blue-300" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-2xl hover:text-pink-400" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-2xl hover:text-blue-500" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-4 text-gray-400">
          &copy; {new Date().getFullYear()} Visa Navigator | All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
