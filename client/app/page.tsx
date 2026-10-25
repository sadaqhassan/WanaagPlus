import AuthForm from "./components/auth-form";
import Link from "next/link";

export default function Home() {
  return (
    <main className="auth-page">
      <section className="auth-layout" aria-label="Account access">
        <div className="auth-main">
          <Link className="brand" href="/" aria-label="WanaagPlus home">
            <span className="brand-mark" aria-hidden="true">
              w
            </span>
            <span>wanaag<span className="brand-plus">plus</span></span>
          </Link>

          <AuthForm />

          <footer className="auth-footer">
            <span>© 2026 WanaagPlus</span>
            <span className="footer-note">A little better, every day.</span>
          </footer>
        </div>

        <aside className="auth-aside" aria-label="Daily inspiration">
          <div className="aside-orbit orbit-one" aria-hidden="true" />
          <div className="aside-orbit orbit-two" aria-hidden="true" />
          <div className="aside-content">
            <div className="aside-label">
              <span className="live-dot" />
              YOUR SPACE TO GROW
            </div>
            <div className="aside-illustration" aria-hidden="true">
              <div className="illustration-sun" />
              <div className="illustration-hill hill-back" />
              <div className="illustration-hill hill-front" />
              <div className="illustration-leaf leaf-one" />
              <div className="illustration-leaf leaf-two" />
            </div>
            <h2>Make room for<br />what matters.</h2>
            <p>
              Build gentle, lasting habits and find a little more intention in
              each day.
            </p>
            <div className="aside-divider" />
            <div className="aside-note">
              <span className="note-icon" aria-hidden="true">✳</span>
              <span>Every meaningful journey begins with one small step.</span>
            </div>
          </div>
          <div className="aside-bottom">
            <span>MINDFULNESS, MADE PERSONAL</span>
            <span className="aside-stars" aria-hidden="true">✳ &nbsp; ✳ &nbsp; ✳</span>
          </div>
        </aside>
      </section>
    </main>
  );
}
