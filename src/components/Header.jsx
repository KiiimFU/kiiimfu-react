import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/', label: 'About Me' },
    { to: '/blog', label: 'Blog' },
    { to: '/famcalendar', label: 'FamCalendar' },
  ]

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-white/20 ${
      isActive ? 'bg-white/30 font-bold' : ''
    }`

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#8dcff9] text-white shadow-md h-16 flex items-center px-6">
      {/* Left: logo + name + social icons */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <NavLink to="/">
          <img src="/apple-touch-icon.png" alt="logo" className="h-10 w-10 rounded-full object-contain" />
        </NavLink>
        <span className="text-xl font-bold whitespace-nowrap">Kimberly Fu</span>
        <div className="flex items-center gap-1 text-lg">
          <a href="mailto:kimberlyfu006@gmail.com" className="p-2 hover:scale-125 hover:text-purple-200 transition-transform text-3xl" title="Email">✉</a>
          <a href="https://github.com/KiiimFU" target="_blank" rel="noreferrer" className="p-2 hover:scale-125 hover:text-purple-200 transition-transform" title="GitHub">
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.479 5.922.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/kimberly-fu-99a634297" target="_blank" rel="noreferrer" className="p-2 hover:scale-125 hover:text-purple-200 transition-transform" title="LinkedIn">
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="ml-auto hidden sm:flex items-center gap-1">
        {navLinks.map(({ to, label }) => (
          <NavLink key={to} to={to} end={to === '/'} className={linkClass}>{label}</NavLink>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <button
        className="ml-auto sm:hidden text-2xl p-2"
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#8dcff9] flex flex-col shadow-md sm:hidden">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to} to={to} end={to === '/'}
              className="px-8 py-3 border-t border-white/20 font-medium hover:bg-white/20"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
