import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B2149] text-white py-10 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Button Section */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center space-x-3 md:space-x-2">
              <img
                src="/logo.png" // Replace with your logo path
                alt="Website Logo"
                className="h-8" // Adjust height if needed
              />
              <h1 className="text-white text-2xl font-bold">NextStep</h1>
            </Link>
            <a
              href="#expert-registration"
              className="w-8/12 px-4 py-2 bg-white text-[#0B2149] text-center rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-300 mt-4"
            >
              Expert Registration
            </a>
          </div>

          {/* Resources Section */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Find Your Path
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Our Experts
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div className="flex flex-col md:ml-8">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm mb-2">123 Main Street, City, Country</p>
            <p className="text-sm mb-2">
              Email:{" "}
              <a href="mailto:info@yourcompany.com" className="hover:underline">
                info@yourcompany.com
              </a>
            </p>
            <p className="text-sm">
              Phone:{" "}
              <a href="tel:+1234567890" className="hover:underline">
                +123-456-7890
              </a>
            </p>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com" // Replace with your Facebook link
                className="text-white text-lg hover:text-gray-300"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com" // Replace with your Twitter link
                className="text-white text-lg hover:text-gray-300"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com" // Replace with your LinkedIn link
                className="text-white text-lg hover:text-gray-300"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://instagram.com" // Replace with your Instagram link
                className="text-white text-lg hover:text-gray-300"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com" // Replace with your YouTube link
                className="text-white text-lg hover:text-gray-300"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm">
            &copy; 2024 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
