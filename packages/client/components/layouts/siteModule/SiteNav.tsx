import Link from "next/link";
import { useEffect, useState } from "react";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
const SiteNav = () => {
  const router = useRouter();
  const [navActive, setNavActive] = useState(false);

  useEffect(() => {
    setNavActive(false);
  }, [router.pathname]);

  return (
    <>
      <nav className={`site-nav ${navActive ? "active" : ""}`}>
        <div className="wrapper">
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/dev">Docs</Link>
            </li>
            <div className="nav-item">
              <Link href="/">
                <button className="cta">Coming soon</button>
              </Link>
            </div>
          </ul>
        </div>
      </nav>

      <button
        onClick={() => setNavActive((state) => !state)}
        className="cta site-nav-btn"
      >
        {navActive ? (
          <XMarkIcon className="icon" />
        ) : (
          <Bars2Icon className="icon" />
        )}
      </button>
    </>
  );
};

export default SiteNav;
