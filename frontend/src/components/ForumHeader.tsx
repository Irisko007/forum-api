export function ForumHeader() {
  return (
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Коло — на головну">
        <span className="brand-mark" aria-hidden="true"><span /></span>
        <span>коло<span className="brand-dot">.</span></span>
      </a>
      <p className="topbar-note">Місце, де думки знаходять своїх</p>
      <a className="topbar-link" href="#feed">До обговорень <span aria-hidden="true">↗</span></a>
    </header>
  );
}
