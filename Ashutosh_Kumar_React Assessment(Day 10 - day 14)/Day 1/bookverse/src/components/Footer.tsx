// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-700 text-blue-100 py-4 mt-10 shadow-inner">
      <div className="container text-center">
        <p className="text-sm mb-1">© {new Date().getFullYear()} BookVerse. All Rights Reserved.</p>
        <p className="text-xs text-blue-200">
          Designed with ❤️ using React, Tailwind, and Bootstrap.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
