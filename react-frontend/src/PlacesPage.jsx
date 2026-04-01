import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LanguageSwitch from "./LanguageSwitch";
import { pick, places, placesPageCopy } from "./siteCopy";

function GlobalHead() {
  useEffect(() => {
    const links = [
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
      "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=JetBrains+Mono:wght@400;700&family=Noto+Serif+JP:wght@300;400;700&display=swap",
    ];
    links.forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const el = document.createElement("link");
        el.rel = "stylesheet";
        el.href = href;
        document.head.appendChild(el);
      }
    });
  }, []);
  return null;
}

const css = `
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#04040a;--bg2:#080812;--bg3:#0d0d1f;
  --red:#ff2d55;--gold:#f7c94e;--ice:#a8d8ea;--lime:#b5f265;
  --mute:rgba(255,255,255,.45);--mute2:rgba(255,255,255,.18);
  --bd:rgba(255,255,255,.09);
  --w:#fff;--r:18px;--t:.32s cubic-bezier(0.2,0.9,0.4,1.1);
  --fd:'Bebas Neue',sans-serif;--fs:'Shippori Mincho',serif;
  --fb:'Crimson Pro',serif;--fm:'JetBrains Mono',monospace;
}
html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--w);font-family:var(--fb);font-size:18px;line-height:1.7;overflow-x:hidden;}
button{cursor:pointer;border:none;background:none;font-family:inherit;color:inherit;}
img{display:block;width:100%;height:100%;object-fit:cover;}
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-track{background:var(--bg);}
::-webkit-scrollbar-thumb{background:var(--red);border-radius:4px;}

.grain-overlay{position:fixed;inset:0;z-index:999;pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  opacity:.45;}

/* ── NAV ── */
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1.5rem 5%;
  display:flex;align-items:center;justify-content:space-between;transition:var(--t);}
nav.stuck{background:rgba(4,4,10,.92);backdrop-filter:blur(20px);
  padding:.9rem 5%;border-bottom:1px solid var(--bd);}
.nl{font-family:var(--fd);font-size:1.6rem;letter-spacing:.08em;
  display:flex;align-items:center;gap:.4rem;color:var(--red);
  background:none;border:none;cursor:pointer;}
.nl a{color:inherit;text-decoration:none;}
.lang-switch{display:flex;align-items:center;gap:.25rem;padding:.22rem;
  border:1px solid var(--bd);border-radius:999px;background:rgba(255,255,255,.03);}
.lang-btn{padding:.38rem .7rem;border-radius:999px;font-family:var(--fm);font-size:.58rem;
  letter-spacing:.14em;text-transform:uppercase;color:var(--mute);transition:var(--t);}
.lang-btn:hover{color:var(--w);}
.lang-btn.active{background:var(--red);color:var(--w);}
.nav-back-btn{font-family:var(--fm);font-size:.68rem;letter-spacing:.18em;
  text-transform:uppercase;color:var(--mute);transition:var(--t);
  background:none;border:1px solid var(--bd);border-radius:40px;
  padding:.45rem 1.3rem;display:flex;align-items:center;gap:.5rem;cursor:pointer;}
.nav-back-btn:hover{color:var(--w);border-color:rgba(255,255,255,.3);}
.nav-back-btn i{font-size:.65rem;}
.nav-page-label{font-family:var(--fm);font-size:.62rem;letter-spacing:.2em;
  text-transform:uppercase;color:var(--red);display:flex;align-items:center;gap:.5rem;}
.nav-page-label::before{content:'';width:16px;height:1px;background:var(--red);}

/* ── HERO ── */
.places-hero{min-height:100vh;display:grid;place-items:center;
  position:relative;overflow:hidden;padding:0 5%;}
.places-hero-bg{position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(ellipse 55% 50% at 15% 20%, rgba(255,45,85,.13) 0%, transparent 65%),
    radial-gradient(ellipse 40% 40% at 85% 80%, rgba(168,216,234,.07) 0%, transparent 60%);}
.places-hero-grid-lines{position:absolute;inset:0;pointer-events:none;
  background-image:
    linear-gradient(rgba(255,45,85,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,45,85,.04) 1px, transparent 1px);
  background-size:80px 80px;}
.places-hero-content{max-width:1280px;width:100%;display:grid;
  grid-template-columns:1fr 1fr;gap:5rem;align-items:center;padding-top:6rem;}
.places-hero-left{}
.h-tag{font-family:var(--fm);font-size:.62rem;letter-spacing:.28em;text-transform:uppercase;
  color:var(--red);margin-bottom:1.5rem;display:flex;align-items:center;gap:.8rem;}
.h-tag::before{content:'';width:28px;height:1px;background:var(--red);}
.h-title{font-family:var(--fd);font-size:clamp(4rem,8vw,4rem);line-height:.9;
  letter-spacing:.03em;margin-bottom:1rem;}
.h-title .line2{color:var(--red);}
.h-title .line3{font-family:'Noto Serif JP',serif;font-size:clamp(.9rem,2vw,1.6rem);
  letter-spacing:.35em;color:var(--mute);font-weight:300;display:block;margin-top:.5rem;}
.h-desc{font-size:1.05rem;color:var(--mute);line-height:1.85;max-width:420px;margin:1.8rem 0 2.2rem;}
.h-btns{display:flex;gap:1rem;flex-wrap:wrap;}
.btn-back{display:inline-flex;align-items:center;gap:.6rem;padding:.85rem 2rem;
  font-family:var(--fm);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;
  border:1px solid var(--bd);border-radius:40px;transition:var(--t);cursor:pointer;
  background:none;color:var(--w);}
.btn-back:hover{border-color:rgba(255,255,255,.3);transform:translateY(-2px);}
.btn-back i{transition:transform var(--t);}
.btn-back:hover i{transform:translateX(-4px);}
.btn-scroll{display:inline-flex;align-items:center;gap:.6rem;padding:.85rem 2.2rem;
  font-family:var(--fm);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;
  background:var(--red);color:var(--w);border-radius:40px;transition:var(--t);
  border:none;cursor:pointer;}
.btn-scroll:hover{transform:translateY(-3px);box-shadow:0 12px 30px rgba(255,45,85,.4);}
.hero-stat-row{display:flex;gap:2.5rem;margin-top:3rem;padding-top:2rem;border-top:1px solid var(--bd);}
.h-stat-n{font-family:var(--fd);font-size:2.6rem;color:var(--red);line-height:1;}
.h-stat-l{font-family:var(--fm);font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:var(--mute2);}
.places-hero-right{display:grid;grid-template-columns:1fr 1fr;gap:1rem;align-self:stretch;}
.hero-img-card{border-radius:var(--r);overflow:hidden;position:relative;
  border:1px solid var(--bd);}
.hero-img-card:nth-child(1){grid-row:span 2;}
.hero-img-card img{width:100%;height:100%;object-fit:cover;filter:saturate(1.1);}
.hero-img-card::after{content:'';position:absolute;inset:0;
  background:linear-gradient(to top,rgba(4,4,10,.7) 0%,transparent 50%);}
.hero-img-label{position:absolute;bottom:14px;left:14px;z-index:2;
  font-family:var(--fm);font-size:.52rem;letter-spacing:.14em;text-transform:uppercase;
  color:var(--w);background:rgba(255,45,85,.85);padding:4px 12px;border-radius:40px;}
.hero-jp{position:absolute;left:5%;top:50%;transform:translateY(-50%);
  font-family:'Noto Serif JP',serif;font-size:10rem;color:rgba(255,255,255,.02);
  letter-spacing:.4em;writing-mode:vertical-rl;pointer-events:none;}

/* ── DIVIDER ── */
.section-divider{height:1px;background:linear-gradient(90deg,transparent,var(--bd),transparent);margin:0 5%;}

/* ── GRID ── */
.w{max-width:1280px;margin:0 auto;padding:0 5%;}
.sec-kicker{font-family:var(--fm);font-size:.62rem;letter-spacing:.28em;text-transform:uppercase;
  color:var(--red);margin-bottom:.8rem;display:flex;align-items:center;gap:.7rem;}
.sec-kicker::before{content:'';width:20px;height:1px;background:var(--red);}
.sec-title{font-family:var(--fd);font-size:clamp(2.4rem,5vw,4.8rem);
  line-height:.96;letter-spacing:.04em;margin-bottom:1rem;}
.sec-sub{font-size:1.05rem;color:var(--mute);max-width:580px;}

.places-section{padding:6rem 0;}
.places-section-hd{margin-bottom:4rem;}
.places-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;}

/* ── PLACE CARD ── */
.place-card{border:1px solid var(--bd);border-radius:var(--r);background:var(--bg2);
  overflow:hidden;transition:var(--t);display:flex;flex-direction:column;}
.place-card:hover{border-color:rgba(255,45,85,.45);transform:translateY(-7px);
  box-shadow:0 32px 60px rgba(0,0,0,.6);}
.place-card-img{height:230px;position:relative;overflow:hidden;flex-shrink:0;}
.place-card-img img{transition:transform .7s ease;}
.place-card:hover .place-card-img img{transform:scale(1.09);}
.place-card-img::after{content:'';position:absolute;inset:0;
  background:linear-gradient(to top,rgba(8,8,18,.6) 0%,transparent 55%);}
.place-badge{position:absolute;top:14px;left:14px;font-family:var(--fm);font-size:.52rem;
  letter-spacing:.14em;text-transform:uppercase;background:var(--red);color:var(--w);
  padding:4px 14px;border-radius:40px;z-index:2;}
.place-badge.gold{background:var(--gold);color:#000;}
.place-badge.ice{background:var(--ice);color:#000;}
.place-num{position:absolute;bottom:14px;right:16px;font-family:var(--fd);font-size:2.8rem;
  color:rgba(255,255,255,.18);line-height:1;z-index:2;}
.place-body{padding:1.8rem;flex:1;display:flex;flex-direction:column;}
.place-district{font-family:var(--fm);font-size:.56rem;letter-spacing:.18em;
  text-transform:uppercase;color:var(--mute2);margin-bottom:.6rem;
  display:flex;align-items:center;gap:.4rem;}
.place-district i{color:var(--red);}
.place-name{font-family:var(--fd);font-size:1.95rem;line-height:.97;margin-bottom:.25rem;}
.place-name-jp{font-family:'Noto Serif JP',serif;font-size:.78rem;color:var(--mute2);
  letter-spacing:.22em;margin-bottom:1rem;}
.place-desc{font-size:.91rem;color:var(--mute);line-height:1.76;margin-bottom:1.2rem;flex:1;}
.place-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1rem;}
.place-tag{font-family:var(--fm);font-size:.52rem;letter-spacing:.1em;text-transform:uppercase;
  padding:.22rem .75rem;border-radius:30px;border:1px solid rgba(255,45,85,.3);
  color:rgba(255,45,85,.75);}
.place-tag.gold{border-color:rgba(247,201,78,.3);color:rgba(247,201,78,.75);}
.place-tip{padding:.75rem 1rem;background:rgba(255,45,85,.06);
  border-left:2px solid rgba(255,45,85,.5);border-radius:0 8px 8px 0;
  font-size:.8rem;color:var(--mute);line-height:1.6;margin-top:auto;}
.place-tip i{color:var(--red);margin-right:.35em;}

/* ── BACK CTA ── */
.back-cta{padding:5rem 5% 6rem;text-align:center;}
.back-cta-inner{display:inline-flex;flex-direction:column;align-items:center;gap:1.5rem;}
.back-cta-label{font-family:var(--fm);font-size:.62rem;letter-spacing:.24em;
  text-transform:uppercase;color:var(--mute2);}
.back-cta-title{font-family:var(--fd);font-size:clamp(1.8rem,4vw,3.2rem);
  line-height:.96;letter-spacing:.04em;}
.back-cta-title span{color:var(--red);}
.btn-back-large{display:inline-flex;align-items:center;gap:.7rem;padding:1rem 2.6rem;
  font-family:var(--fm);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;
  background:none;color:var(--w);border:1px solid var(--bd);
  border-radius:40px;transition:var(--t);cursor:pointer;}
.btn-back-large:hover{border-color:var(--red);color:var(--red);transform:translateY(-2px);}
.btn-back-large i{transition:transform var(--t);}
.btn-back-large:hover i{transform:translateX(-5px);}

/* ── FOOTER ── */
footer{background:var(--bg);border-top:1px solid var(--bd);padding:3rem 5%;
  display:grid;grid-template-columns:1fr auto;gap:2rem;align-items:center;}
.fo-logo{font-family:var(--fd);font-size:2.2rem;letter-spacing:.08em;color:var(--red);}
.fo-sub{font-size:.85rem;color:var(--mute);}
.fo-right{font-family:var(--fm);font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;text-align:right;}

@media(max-width:1024px){
  .places-hero-content{grid-template-columns:1fr;}
  .places-hero-right{display:none;}
}
@media(max-width:900px){
    district: "Икебукуро, Токио", name: "Pokémon Center Mega", nameJp: "ポケモンセンターメガトウキョー",
    desc: "Крупнейший магазин покемонов в мире: эксклюзивный мерч, лимитированные карточки, плюшевые покемоны всех поколений и фотозона. Регулярные ивенты по выходным.",
    tags: ["Покемон", "Мерч", "Карточки", "Эксклюзив"],
    tip: "В день релиза новой игры — очереди от 2 часов. Лимитированное бронируй онлайн.",
    img: "https://www.pokemon.co.jp/corporate/images/pkmnc_top_img01.jpg",
  },
  {
    id: 8, badge: "ФИГУРКИ", badgeClass: "",
    district: "Акихабара, Токио", name: "Tamashii Nations", nameJp: "魂ネイションズ東京",
    desc: "Официальный выставочный зал Bandai Spirits: прототипы ещё не вышедших фигурок, первые релизы серий S.H.Figuarts и Metal Build, подписные экземпляры и закрытые показы.",
    tags: ["S.H.Figuarts", "Metal Build", "Promo"],
    tip: "Часть фигурок продаётся только здесь и не появляется в обычных магазинах.",
    img: "https://tamashii.jp/common/img/ogp_img.jpg",
  },
];

`;

const PLACES = places;

/* ─── MAIN EXPORT ─── */
export default function PlacesPage({ language, setLanguage }) {
  const [stuck, setStuck] = useState(false);
  const navigate = useNavigate();
  const copy = placesPageCopy[language];

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const onScroll = () => setStuck(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <GlobalHead />
      <style>{css}</style>
      <div className="grain-overlay" />

      {/* NAV */}
      <nav className={stuck ? "stuck" : ""}>
        <span className="nl">
          <a href="/">
            <span style={{fontFamily: "var(--fs)", fontSize: "1.8rem" }}>日</span>
            NIHON TRAVEL</a>
          
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <span className="nav-page-label">
            <i className="fa-solid fa-map-location-dot" style={{ color: "var(--red)" }} />
            {copy.pageLabel}
          </span>
          <button className="nav-back-btn" onClick={() => navigate("/")}>
            <i className="fa-solid fa-arrow-left" />
            {copy.backButton}
          </button>
          <LanguageSwitch language={language} setLanguage={setLanguage} />
        </div>
      </nav>

      {/* HERO */}
      <section className="places-hero">
        <div className="places-hero-bg" />
        <div className="places-hero-grid-lines" />
        <div className="hero-jp">聖地</div>
        <div className="places-hero-content">
          <div className="places-hero-left">
            <div className="h-tag">{copy.heroTag}</div>
            <h1 className="h-title">
              {copy.heroTitleTop}<br />
              <span className="line2">{copy.heroTitleBottom}</span>
              <span className="line3">アニメ聖地ガイド</span>
            </h1>
            <p className="h-desc">{copy.heroDesc}</p>
            <div className="h-btns">
                <button className="btn-back" onClick={() => navigate("/")}>
                <i className="fa-solid fa-arrow-left" /> {copy.heroBack}
                </button>
              <button className="btn-scroll" onClick={() => document.getElementById("places-grid")?.scrollIntoView({ behavior: "smooth" })}>
                <i className="fa-solid fa-compass" /> {copy.heroScroll}
              </button>
            </div>
            <div className="hero-stat-row">
              <div><span className="h-stat-n">8</span><div className="h-stat-l">{copy.statLocations}</div></div>
              <div><span className="h-stat-n">5</span><div className="h-stat-l">{copy.statDistricts}</div></div>
              <div><span className="h-stat-n">∞</span><div className="h-stat-l">{copy.statMerch}</div></div>
            </div>
          </div>
          <div className="places-hero-right">
            <div className="hero-img-card">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Akihabara2019spring.jpg" alt="Akihabara" />
              <span className="hero-img-label">秋葉原 · Akihabara</span>
            </div>
            <div className="hero-img-card">
              <img src="https://www.japan-guide.com/g23/3041_01.jpg" alt="Ghibli Museum" />
              <span className="hero-img-label">Ghibli Museum</span>
            </div>
            <div className="hero-img-card">
              <img src="https://offloadmedia.feverup.com/secrettokyo.com/wp-content/uploads/2023/02/07225107/Suga-Shrine-Otokozaka.jpg" alt="Suga Shrine" />
              <span className="hero-img-label">須賀神社 Suga</span>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* PLACES GRID */}
      <section className="places-section" id="places-grid">
        <div className="w">
          <div className="places-section-hd">
            <div className="sec-kicker">{copy.sectionKicker}</div>
            <h2 className="sec-title">{copy.sectionTitle}</h2>
            <p className="sec-sub">{copy.sectionSub}</p>
          </div>
          <div className="places-grid">
            {PLACES.map((p) => (
              <div className="place-card" key={p.id}>
                <div className="place-card-img">
                  <img src={p.img} alt={pick(p.name, language)} />
                  <span className={"place-badge" + (p.badgeClass ? " " + p.badgeClass : "")}>{pick(p.badge, language)}</span>
                  <span className="place-num">0{p.id}</span>
                </div>
                <div className="place-body">
                  <div className="place-district"><i className="fa-solid fa-location-dot" /> {pick(p.district, language)}</div>
                  <div className="place-name">{pick(p.name, language)}</div>
                  <div className="place-name-jp">{p.nameJp}</div>
                  <p className="place-desc">{pick(p.desc, language)}</p>
                  <div className="place-tags">
                    {pick(p.tags, language).map((t) => (
                      <span className={"place-tag" + (p.badgeClass === "gold" ? " gold" : "")} key={t}>{t}</span>
                    ))}
                  </div>
                  {p.tip && (
                    <div className="place-tip">
                      <i className="fa-solid fa-lightbulb" />{pick(p.tip, language)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* BACK CTA */}
      <div className="back-cta">
          <div className="back-cta-inner">
            <div className="back-cta-label">{copy.backCtaLabel}</div>
            <div className="back-cta-title">{copy.backCtaTitle}</div>
            <p style={{ color: "var(--mute)", fontSize: ".95rem", maxWidth: "380px", textAlign: "center" }}>
              {copy.backCtaText}
            </p>
            <button className="btn-back-large" onClick={() => navigate("/")}>
              <i className="fa-solid fa-arrow-left" /> {copy.backButton}
            </button>
          </div>
        </div>

      <footer>
        <div>
          <div className="fo-logo">ANIME ATLAS</div>
          <div className="fo-sub">{copy.footerSub}</div>
        </div>
        <div className="fo-right">
          アニメ聖地<br /><span style={{ color: "var(--red)" }}>{copy.footerNote}</span>
        </div>
      </footer>
    </>
  );
}
