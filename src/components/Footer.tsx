
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-600 bg-opacity-75 z-50 text-white py-4 text-center mt-10 ">
      <div className="container mx-auto px-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} MovieApp. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
