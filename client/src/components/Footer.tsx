import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#5B2501] text-white">
  <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

      {/* Brand */}
      <div>
        <h2 className="text-2xl font-bold">
          Library Management
        </h2>

        <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">
          Discover, borrow, and manage your favorite books with ease.
          Your digital gateway to a world of knowledge.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider">
          Quick Links
        </h3>

        <ul className="mt-4 space-y-3 text-sm text-white/70">
          <li>
            <a href="/" className="transition hover:text-white">
              Home
            </a>
          </li>

          <li>
            <a href="/books" className="transition hover:text-white">
              Browse Books
            </a>
          </li>

          <li>
            <a href="/about" className="transition hover:text-white">
              About Us
            </a>
          </li>

          <li>
            <a href="/contact" className="transition hover:text-white">
              Contact Us
            </a>
          </li>
        </ul>
      </div>

      {/* Library */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider">
          Library
        </h3>

        <ul className="mt-4 space-y-3 text-sm text-white/70">
          <li>
            <a href="/books" className="transition hover:text-white">
              All Books
            </a>
          </li>

          <li>
            <a href="/categories" className="transition hover:text-white">
              Categories
            </a>
          </li>

          <li>
            <a href="/login" className="transition hover:text-white">
              Login
            </a>
          </li>

          <li>
            <a href="/register" className="transition hover:text-white">
              Create Account
            </a>
          </li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider">
          Get In Touch
        </h3>

        <div className="mt-4 space-y-3 text-sm text-white/70">
          <p>📍 Library Management System</p>
          <p>📧 support@library.com</p>
          <p>📞 +91 98765 43210</p>
        </div>
      </div>
    </div>

    {/* Bottom */}
    <div className="mt-10 border-t border-white/15 pt-6">
      <div className="flex flex-col items-center justify-between gap-4 text-sm text-white/60 sm:flex-row">
        <p>
          © 2026 Library Management System. All rights reserved.
        </p>

        <div className="flex gap-6">
          <a
            href="/privacy"
            className="transition hover:text-white"
          >
            Privacy Policy
          </a>

          <a
            href="/terms"
            className="transition hover:text-white"
          >
            Terms & Conditions
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>
  )
}

export default Footer