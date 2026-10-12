import { ForumHeader } from './components/ForumHeader';
import { PostFeed } from './components/PostFeed';
import { posts } from './data/posts';
import './App.css';

const categories = ['Розробка', 'Навчання', 'Спільнота', 'Ідеї'];

function App() {
  return (
    <div className="site-shell" id="top">
      <ForumHeader />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="status-dot" /> ВІДКРИТА СПІЛЬНОТА</p>
            <h1 id="hero-title">Хороші розмови<br />починаються <em>тут.</em></h1>
            <p className="hero-description">Ділися тим, що знаєш. Запитуй про те, що цікаво. Знаходь людей на своїй хвилі.</p>
            <a href="#feed" className="hero-cta">Зазирнути у стрічку <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="hero-sun">к</div>
            <span className="art-note note-one">ідеї ростуть</span>
            <span className="art-note note-two">разом ✳</span>
            <span className="art-spark">✳</span>
          </div>
          <div className="hero-index">01 <span>/</span> 04</div>
        </section>

        <div className="content-layout">
          <aside className="sidebar" aria-label="Про спільноту">
            <div className="side-intro">
              <p className="eyebrow">НАША ІДЕЯ</p>
              <p>Інтернет стає теплішим, коли ми говоримо одне з одним.</p>
            </div>
            <div className="category-nav">
              <p className="eyebrow">ТЕМИ ДЛЯ РОЗМОВ</p>
              {categories.map((category, index) => (
                <a href="#feed" className="category-link" key={category}>
                  <span className="category-index">0{index + 1}</span>{category}<span className="category-arrow">↗</span>
                </a>
              ))}
            </div>
            <div className="community-note">
              <span className="note-icon">✳</span>
              <p>Тут є місце<br />кожному голосу.</p>
            </div>
          </aside>
          <PostFeed posts={posts} />
        </div>
      </main>
      <footer className="footer"><span>коло<span className="brand-dot">.</span></span><span>Твоя спільнота починається з розмови.</span><a href="#top">НАГОРУ ↑</a></footer>
    </div>
  );
}

export default App;
