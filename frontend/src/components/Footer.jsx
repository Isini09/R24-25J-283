import React from "react";

function Footer() {
  return (
    <footer className="px-4 py-6 text-center text-white bg-black/70">
      <div className="max-w-screen-xl mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Cyber Seeds. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 mt-2 text-sm">
          <a href="/privacy-policy" className="transition hover:text-green-300">Privacy Policy</a>
          <a href="/terms" className="transition hover:text-green-300">Terms of Service</a>
          <a href="/contact" className="transition hover:text-green-300">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
