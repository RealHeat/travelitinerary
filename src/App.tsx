/* =========================================================================
   APP SHELL  ·  nav, router, page transitions, scroll reveals
   ---------------------------------------------------------------------------
   To add or rename a page, edit the PAGES array below and add a matching
   <Route>. The 7 country pages all share one <Country> component.
   ========================================================================= */

import { useEffect, useRef } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  NavLink,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { Home } from './pages/Home';
import { Country } from './pages/Country';
import { Compass } from './components/icons';
import { trip } from './data/trip';
import './styles.css';

// The site map. label = nav text · path = route.
const PAGES = [
  { path: '/', label: 'Home' },
  ...trip.stops.map((s) => ({ path: `/stop/${s.stopNumber}`, label: `Stop ${s.stopNumber}` })),
];

function Layout() {
  const location = useLocation();
  const stageRef = useRef<HTMLElement>(null);

  // Scroll to top + re-arm the scroll-reveal observer on every navigation.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });

    const root = stageRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>('.reveal'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    els.forEach((el, i) => {
      el.classList.remove('in');
      el.style.transitionDelay = Math.min(i * 80, 320) + 'ms';
      io.observe(el);
    });

    return () => io.disconnect();
  }, [location.pathname]);

  return (
    <>
      <nav className="nav">
        <NavLink to="/" className="nav__brand">
          <Compass className="compass" />
          Around the World
        </NavLink>
        <div className="nav__links">
          {PAGES.map((p) => (
            <NavLink
              key={p.path}
              to={p.path}
              end
              className={({ isActive }) => 'nav__link' + (isActive ? ' is-active' : '')}
            >
              {p.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <main className="stage" ref={stageRef}>
        {/* key forces a remount so the page-in animation replays */}
        <div key={location.pathname}>
          <Outlet />
        </div>
      </main>

      <footer className="footer">APHuG Travel Itinerary · Eisei &amp; Nicholas</footer>
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/stop/:n" element={<Country />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
