import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LanguageSwitch from "./LanguageSwitch";
import { animeAtlasCopy, animeAtlasTips, pick, irlCards, fansPanels, conventionsData } from "./siteCopy";

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
  --bd:rgba(255,255,255,.09);--bd2:rgba(255,255,255,.04);
  --w:#fff;--r:18px;--t:.32s cubic-bezier(0.2,0.9,0.4,1.1);
  --fd:'Bebas Neue',sans-serif;--fs:'Shippori Mincho',serif;
  --fb:'Crimson Pro',serif;--fm:'JetBrains Mono',monospace;
}
html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--w);font-family:var(--fb);font-size:18px;line-height:1.7;overflow-x:hidden;}
a{color:inherit;text-decoration:none;}
button{cursor:pointer;border:none;background:none;font-family:inherit;color:inherit;}
img{display:block;width:100%;height:100%;object-fit:cover;}
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-track{background:var(--bg);}
::-webkit-scrollbar-thumb{background:var(--red);border-radius:4px;}

.grain-overlay{position:fixed;inset:0;z-index:999;pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  opacity:.45;}

nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1.5rem 5%;
  display:flex;align-items:center;justify-content:space-between;transition:var(--t);}
nav.stuck{background:rgba(4,4,10,.92);backdrop-filter:blur(20px);
  padding:.9rem 5%;border-bottom:1px solid var(--bd);}
.nl{font-family:var(--fd);font-size:1.6rem;letter-spacing:.08em;
  display:flex;align-items:center;gap:.4rem;color:var(--red);
  background:none;border:none;cursor:pointer;}
.nc{display:flex;gap:2.5rem;align-items:center;}
.nc a{font-family:var(--fm);font-size:.68rem;letter-spacing:.18em;
  text-transform:uppercase;color:var(--mute);transition:var(--t);}
.nc a:hover{color:var(--w);}
.lang-switch{display:flex;align-items:center;gap:.25rem;padding:.22rem;
  border:1px solid var(--bd);border-radius:999px;background:rgba(255,255,255,.03);}
.lang-btn{padding:.38rem .7rem;border-radius:999px;font-family:var(--fm);font-size:.58rem;
  letter-spacing:.14em;text-transform:uppercase;color:var(--mute);transition:var(--t);}
.lang-btn:hover{color:var(--w);}
.lang-btn.active{background:var(--red);color:var(--w);}
.nav-places-btn{font-family:var(--fm);font-size:.68rem;letter-spacing:.18em;
  text-transform:uppercase;color:var(--mute);transition:var(--t);
  background:none;border:1px solid var(--bd);border-radius:40px;
  padding:.45rem 1.2rem;display:flex;align-items:center;gap:.5rem;cursor:pointer;}
.nav-places-btn:hover{color:var(--w);border-color:var(--red);background:rgba(255,45,85,.1);}

.hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;
  position:relative;overflow:hidden;}
.hero-left{padding:12rem 5% 6rem;display:flex;flex-direction:column;
  justify-content:center;position:relative;z-index:2;}
.hero-right{position:relative;overflow:hidden;}
.hero-right::after{content:'';position:absolute;inset:0;
  background:linear-gradient(to right,var(--bg) 0%,transparent 40%);}
.hero-img{width:100%;height:100%;object-fit:cover;filter:saturate(1.25)contrast(1.05);}
.h-tag{font-family:var(--fm);font-size:.62rem;letter-spacing:.28em;text-transform:uppercase;
  color:var(--red);margin-bottom:1.5rem;display:flex;align-items:center;gap:.8rem;}
.h-tag::before{content:'';width:28px;height:1px;background:var(--red);}
.h-title{font-family:var(--fd);font-size:clamp(4rem,9vw,9rem);line-height:.92;
  letter-spacing:.03em;margin-bottom:1rem;}
.h-title .line2{color:var(--red);}
.h-title .line3{font-family:var(--fs);font-size:clamp(1rem,2.5vw,2.2rem);
  letter-spacing:.35em;color:var(--mute);font-weight:300;display:block;margin-top:.4rem;}
.h-desc{font-size:1.1rem;color:var(--mute);line-height:1.85;max-width:440px;margin:1.8rem 0 2.5rem;}
.h-btns{display:flex;gap:1rem;flex-wrap:wrap;}
.btn-main{display:inline-flex;align-items:center;gap:.6rem;padding:.85rem 2.2rem;
  font-family:var(--fm);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;
  background:var(--red);color:var(--w);border-radius:40px;transition:var(--t);
  border:none;cursor:pointer;}
.btn-main:hover{transform:translateY(-3px);box-shadow:0 12px 30px rgba(255,45,85,.4);}
.btn-ghost{display:inline-flex;align-items:center;gap:.6rem;padding:.85rem 2.2rem;
  font-family:var(--fm);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;
  border:1px solid var(--bd);border-radius:40px;transition:var(--t);cursor:pointer;
  background:none;color:var(--w);}
.btn-ghost:hover{border-color:var(--red);color:var(--red);transform:translateY(-2px);}
.h-stats{display:flex;gap:3rem;margin-top:3.5rem;padding-top:2.5rem;border-top:1px solid var(--bd);}
.h-stat-n{font-family:var(--fd);font-size:2.8rem;color:var(--red);line-height:1;}
.h-stat-l{font-family:var(--fm);font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--mute2);}
.hero-jp{position:absolute;right:-2rem;top:50%;transform:translateY(-50%);
  font-family:var(--fs);font-size:9rem;color:rgba(255,255,255,.025);
  letter-spacing:.4em;writing-mode:vertical-rl;pointer-events:none;}
.scan{position:absolute;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,var(--red),transparent);
  animation:scanMove 8s linear infinite;opacity:.25;z-index:3;}
@keyframes scanMove{from{top:-2%;}to{top:102%;}}

.sec{padding:7rem 0;}
.w{max-width:1280px;margin:0 auto;padding:0 5%;}
.sec-kicker{font-family:var(--fm);font-size:.62rem;letter-spacing:.28em;text-transform:uppercase;
  color:var(--red);margin-bottom:.8rem;display:flex;align-items:center;gap:.7rem;}
.sec-kicker::before{content:'';width:20px;height:1px;background:var(--red);}
.sec-title{font-family:var(--fd);font-size:clamp(2.4rem,5vw,4.8rem);
  line-height:.96;letter-spacing:.04em;margin-bottom:1rem;}
.sec-sub{font-size:1.05rem;color:var(--mute);max-width:560px;}
.sec-hd{margin-bottom:4rem;}
.sec-hd.c{text-align:center;}
.sec-hd.c .sec-sub{margin:0 auto;}
.sec-hd.c .sec-kicker{justify-content:center;}
.sec-hd.c .sec-kicker::before{display:none;}

.irl-sec{background:var(--bg2);}
.irl-stack{display:flex;flex-direction:column;gap:3rem;}
.irl-card{display:flex;flex-direction:column;gap:2rem;background:var(--bg2);
  border:1px solid var(--bd);border-radius:var(--r);overflow:hidden;transition:var(--t);}
.irl-card:hover{border-color:rgba(255,45,85,.4);transform:translateY(-4px);}
.irl-info{padding:2.5rem 2rem;display:flex;flex-direction:column;justify-content:center;}
.irl-from{font-family:var(--fm);font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:var(--red);margin-bottom:.6rem;}
.irl-name{font-family:var(--fd);font-size:clamp(1.6rem,3vw,2.6rem);line-height:1.1;margin-bottom:.4rem;}
.irl-jp{font-family:var(--fs);font-size:.85rem;color:var(--mute2);letter-spacing:.2em;margin-bottom:.8rem;}
.irl-loc{font-family:var(--fm);font-size:.7rem;color:var(--mute);margin-bottom:1rem;
  display:flex;align-items:center;gap:.4rem;}
.irl-loc::before{content:'◉';color:var(--red);font-size:.55rem;}
.irl-text{font-size:1rem;color:var(--mute);line-height:1.8;margin-bottom:1.2rem;}
.irl-tags{display:flex;flex-wrap:wrap;gap:.5rem;}
.irl-tag{font-family:var(--fm);font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;
  padding:.25rem .8rem;border-radius:30px;border:1px solid rgba(255,45,85,.4);color:rgba(255,45,85,.85);}
.irl-media-duo{display:flex;flex-direction:column;margin-top:auto;background:#000;}
.irl-media-duo .photo-panel{position:relative;overflow:hidden;min-height:320px;}
.irl-media-duo .photo-panel img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease;}
.irl-card:hover .photo-panel img{transform:scale(1.03);}
.photo-label{position:absolute;bottom:12px;left:12px;font-family:var(--fm);font-size:.55rem;
  letter-spacing:.14em;text-transform:uppercase;background:rgba(0,0,0,.65);backdrop-filter:blur(4px);
  padding:4px 12px;border-radius:40px;color:var(--w);z-index:2;}
.photo-label.anime-label{background:rgba(255,45,85,.85);}
.photo-label.real-label{background:rgba(247,201,78,.9);color:#000;}

.fans-tabs{display:flex;border:1px solid var(--bd);border-radius:60px;overflow:hidden;
  margin-bottom:3.5rem;background:var(--bg2);flex-wrap:wrap;justify-content:center;}
.ftab{flex:1;padding:1rem 1.2rem;font-family:var(--fm);font-size:.6rem;letter-spacing:.14em;
  text-transform:uppercase;color:var(--mute);transition:var(--t);text-align:center;
  background:transparent;display:flex;align-items:center;justify-content:center;gap:.4rem;}
.ftab.on{color:var(--w);background:var(--red);}
.fpanel{display:none;}
.fpanel.on{display:block;animation:fadeUp .4s ease;}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
.fpanel-hd{display:grid;grid-template-columns:auto 1fr;gap:2rem;margin-bottom:3rem;
  padding-bottom:2rem;border-bottom:1px solid var(--bd);}
.fpanel-cover{width:140px;height:180px;border-radius:var(--r);overflow:hidden;
  box-shadow:0 12px 30px rgba(0,0,0,.5);}
.fpanel-studio{font-family:var(--fm);font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:var(--red);margin-bottom:.5rem;}
.fpanel-name{font-family:var(--fd);font-size:clamp(2rem,4vw,3rem);line-height:1;margin-bottom:.3rem;}
.fpanel-jp{font-family:var(--fs);font-size:.85rem;color:var(--mute2);letter-spacing:.2em;margin-bottom:.8rem;}
.fpanel-desc{font-size:.95rem;color:var(--mute);line-height:1.7;max-width:640px;}
.fgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;}
.fcard{border:1px solid var(--bd);border-radius:var(--r);overflow:hidden;background:var(--bg2);transition:var(--t);}
.fcard:hover{border-color:rgba(255,45,85,.5);transform:translateY(-6px);box-shadow:0 24px 48px rgba(0,0,0,.6);}
.fcard-img{height:280px;position:relative;overflow:hidden;}
.fcard-img img{transition:transform .6s ease;width:100%;height:100%;object-fit:cover;}
.fcard:hover .fcard-img img{transform:scale(1.08);}
.fcard-body{padding:1.5rem 1.6rem;}
.fcard-loc{font-family:var(--fm);font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:var(--mute2);margin-bottom:.5rem;}
.fcard-name{font-family:var(--fd);font-size:1.6rem;margin-bottom:.6rem;line-height:1.2;}
.fcard-text{font-size:.92rem;color:var(--mute);line-height:1.7;}

.cos-sec{background:var(--bg3);}
.cos-intro{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;margin-bottom:5rem;}
.cos-intro-img{aspect-ratio:4/5;border-radius:var(--r);overflow:hidden;position:relative;box-shadow:0 20px 35px rgba(0,0,0,.4);}
.cos-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2rem;margin-bottom:5rem;}
.conv-card{border:1px solid var(--bd);border-radius:var(--r);background:var(--bg2);
  display:grid;grid-template-columns:100px 1fr;transition:var(--t);overflow:hidden;}
.conv-card:hover{border-color:rgba(247,201,78,.5);transform:translateY(-4px);box-shadow:0 20px 35px rgba(0,0,0,.3);}
.conv-date{background:var(--red);padding:1.5rem .5rem;display:flex;flex-direction:column;
  align-items:center;justify-content:center;text-align:center;flex-shrink:0;}
.conv-date.gold{background:var(--gold);color:#000;}
.conv-date.ice{background:var(--ice);color:#000;}
.conv-date.lime{background:var(--lime);color:#000;}
.conv-month{font-family:var(--fm);font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;}
.conv-day{font-family:var(--fd);font-size:2rem;line-height:1;}
.conv-body{padding:1.2rem 1.6rem;background:var(--bg2);display:flex;flex-direction:column;}
.conv-country{font-family:var(--fm);font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:var(--mute2);margin-bottom:.4rem;}
.conv-name{font-family:var(--fd);font-size:1.45rem;letter-spacing:.04em;margin-bottom:.2rem;}
.conv-city{font-family:var(--fm);font-size:.65rem;color:var(--mute);display:flex;gap:.4rem;margin-bottom:.7rem;}
.conv-desc{font-size:.85rem;color:var(--mute);line-height:1.6;margin-bottom:.8rem;}
.conv-img-large{width:100%;height:300px;object-fit:scale-down;border-radius:12px;margin-top:10px;
  border:1px solid rgba(255,255,255,.1);transition:transform .3s ease;}
.conv-card:hover .conv-img-large{transform:scale(1.02);}
.conv-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.8rem;}
.conv-tag{font-family:var(--fm);font-size:.5rem;letter-spacing:.1em;text-transform:uppercase;
  padding:.2rem .6rem;border-radius:20px;border:1px solid var(--bd);color:var(--mute);}
.cos-tips{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;margin-top:3rem;
  border-top:1px solid var(--bd);padding-top:3rem;}
.tip-card{padding:1.6rem 1.4rem;border-left:2px solid transparent;transition:var(--t);}
.tip-card:hover{border-left-color:var(--red);}
.tip-icon{font-size:2rem;margin-bottom:1rem;line-height:1;}
.tip-icon i{font-size:1.8rem;color:var(--red);}
.tip-title{font-family:var(--fd);font-size:1.25rem;margin-bottom:.6rem;}
.tip-text{font-size:.88rem;color:var(--mute);line-height:1.65;}

/* places CTA banner */
.places-cta-banner{margin:0;padding:5rem 5%;background:linear-gradient(135deg,rgba(255,45,85,.12) 0%,rgba(255,45,85,.04) 100%);
  border-top:1px solid rgba(255,45,85,.2);border-bottom:1px solid rgba(255,45,85,.2);}
.places-cta-inner{max-width:1280px;margin:0 auto;display:grid;
  grid-template-columns:1fr auto;align-items:center;gap:3rem;}
.places-cta-label{font-family:var(--fm);font-size:.62rem;letter-spacing:.28em;
  text-transform:uppercase;color:var(--red);margin-bottom:.6rem;
  display:flex;align-items:center;gap:.6rem;}
.places-cta-label::before{content:'';width:20px;height:1px;background:var(--red);}
.places-cta-title{font-family:var(--fd);font-size:clamp(2rem,4vw,3.5rem);
  line-height:.96;letter-spacing:.04em;margin-bottom:.8rem;}
.places-cta-sub{font-size:.95rem;color:var(--mute);max-width:480px;}
.btn-places{display:inline-flex;align-items:center;gap:.7rem;padding:1rem 2.4rem;
  font-family:var(--fm);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;
  background:transparent;color:var(--w);border:1px solid var(--red);
  border-radius:40px;transition:var(--t);cursor:pointer;white-space:nowrap;}
.btn-places:hover{background:var(--red);transform:translateY(-3px);
  box-shadow:0 12px 30px rgba(255,45,85,.4);}
.btn-places i{font-size:1rem;}

footer{background:var(--bg);border-top:1px solid var(--bd);padding:3rem 5%;
  display:grid;grid-template-columns:1fr auto;gap:2rem;align-items:center;}
.fo-logo{font-family:var(--fd);font-size:2.2rem;letter-spacing:.08em;color:var(--red);}
.fo-sub{font-size:.85rem;color:var(--mute);}
.fo-right{font-family:var(--fm);font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;text-align:right;}

@media(max-width:900px){
  .hero{grid-template-columns:1fr;}
  .hero-right{display:none;}
  .fgrid{grid-template-columns:1fr;}
  .fcard-img{height:240px;}
  .cos-intro{grid-template-columns:1fr;gap:2rem;}
  .cos-grid{grid-template-columns:1fr;}
  .cos-tips{grid-template-columns:repeat(2,1fr);}
  .fpanel-hd{grid-template-columns:1fr;}
  .conv-card{grid-template-columns:80px 1fr;}
  footer{grid-template-columns:1fr;}
  .fo-right{text-align:left;}
  .conv-img-large{height:160px;}
  .places-cta-inner{grid-template-columns:1fr;}
}
@media(max-width:600px){
  .cos-tips{grid-template-columns:1fr;}
  .fans-tabs{border-radius:20px;}
  .ftab{padding:.7rem .5rem;font-size:.5rem;}
  .fcard-img{height:200px;}
  .nc{gap:1rem;}
}
`;

const TABS = [
  { id: "ghibli",    icon: "fa-clapperboard", label: "GHIBLI" },
  { id: "yourname",  icon: "fa-star",         label: "YOUR NAME" },
  { id: "weathering",icon: "fa-sun",          label: "WEATHERING WITH YOU" },
  { id: "garden",    icon: "fa-leaf",         label: "THE GARDEN OF WORDS" },
  { id: "jjk",       icon: "fa-bolt",         label: "JUJUTSU KAISEN" },
];

function FCard({ img, loc, name, text }) {
  return (
    <div className="fcard">
      <div className="fcard-img"><img src={img} alt={name} /></div>
      <div className="fcard-body">
        <div className="fcard-loc"><i className="fa-solid fa-location-dot" /> {loc}</div>
        <h4 className="fcard-name">{name}</h4>
        <p className="fcard-text">{text}</p>
      </div>
    </div>
  );
}

function FansSection({ language }) {
  const [active, setActive] = useState("ghibli");
  const copy = animeAtlasCopy[language];
  return (
    <section className="sec fans-sec" id="fans">
      <div className="w">
        <div className="sec-hd c">
          <div className="sec-kicker">{copy.fans.kicker}</div>
          <h2 className="sec-title">{copy.fans.title}</h2>
          <p className="sec-sub">{copy.fans.sub}</p>
        </div>
        <div className="fans-tabs">
          {TABS.map((t) => (
            <button key={t.id} className={"ftab" + (active === t.id ? " on" : "")} onClick={() => setActive(t.id)}>
              <i className={"fa-solid " + t.icon} /> {t.label}
            </button>
          ))}
        </div>

        {Object.entries(fansPanels).map(([key, panel]) => (
          <div className={"fpanel" + (active === key ? " on" : "")} key={key}>
            <div className="fpanel-hd">
              <div className="fpanel-cover"><img src={panel.img} alt={key} /></div>
              <div><div className="fpanel-studio">{panel.studio}</div><h3 className="fpanel-name">{pick(panel.name, language)}</h3><div className="fpanel-jp">{panel.jp}</div><p className="fpanel-desc">{pick(panel.desc, language)}</p></div>
            </div>
            <div className="fgrid">
              {panel.cards.map((card, idx) => (
                <FCard key={idx} img={card.img} loc={pick(card.loc, language)} name={pick(card.name, language)} text={pick(card.text, language)} />
              ))}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}

export default function AnimeAtlasPage({ language, setLanguage }) {
  const [stuck, setStuck] = useState(false);
  const navigate = useNavigate();
  const copy = animeAtlasCopy[language];

  useEffect(() => {
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
          <a href="/"> <span style={{ fontFamily: "var(--fs)", fontSize: "1.8rem" }}>日</span>
          NIHON TRAVEL</a>
        </span>
        <div className="nc">
          <a href="#irl">{copy.nav.locations}</a>
          <a href="#fans">{copy.nav.byAnime}</a>
          <a href="#cosplay">{copy.nav.cosplay}</a>
          <button className="nav-places-btn" onClick={() => navigate("/places")}>
            <i className="fa-solid fa-map-location-dot" />
            {copy.nav.places}
          </button>
          <LanguageSwitch language={language} setLanguage={setLanguage} />
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="scan" />
        <div className="hero-left">
          <div className="h-tag">{copy.hero.tag}</div>
          <h1 className="h-title">
            ANIME<br />
            <span className="line2">ATLAS</span>
            <span className="line3">聖地巡礼</span>
          </h1>
          <p className="h-desc">{copy.hero.desc}</p>
          <div className="h-btns">
            <a href="#irl" className="btn-main">→ {copy.hero.explore}</a>
            <a href="#cosplay" className="btn-ghost"><i className="fa-solid fa-masks-theater" /> {copy.hero.conventions}</a>
          </div>
          <div className="h-stats">
            <div><span className="h-stat-n">5</span><div className="h-stat-l">{copy.hero.animeStat}</div></div>
            <div><span className="h-stat-n">20+</span><div className="h-stat-l">{copy.hero.locationStat}</div></div>
            <div><span className="h-stat-n">12</span><div className="h-stat-l">{copy.hero.eventStat}</div></div>
          </div>
        </div>
        <div className="hero-right">
          <img className="hero-img" src="https://blog.japanwondertravel.com/wp-content/uploads/2022/03/manuel-velasquez-ssfp9okORYs-unsplash.jpg" alt="Tokyo night" />
        </div>
        <div className="hero-jp">聖地</div>
      </section>

      {/* IRL */}
      <section className="sec irl-sec" id="irl">
        <div className="w">
          <div className="sec-hd">
            <div className="sec-kicker">{copy.irl.kicker}</div>
            <h2 className="sec-title">{copy.irl.titleTop}<br />{copy.irl.titleBottom}</h2>
            <p className="sec-sub">{copy.irl.sub}</p>
          </div>
          
          <div className="irl-stack">
            {irlCards.map((card, idx) => (
              <div className="irl-card" key={idx}>
                <div className="irl-info">
                  <div className="irl-from"><i className="fa-solid fa-clapperboard" /> {pick(card.from, language)}</div>
                  <h3 className="irl-name">{pick(card.name, language)}</h3>
                  <div className="irl-jp">{card.jp}</div>
                  <div className="irl-loc">{pick(card.loc, language)}</div>
                  <p className="irl-text">{pick(card.text, language)}</p>
                  <div className="irl-tags">
                    {pick(card.tags, language).map(t => <span className="irl-tag" key={t}>{t}</span>)}
                  </div>
                </div>
                <div className="irl-media-duo">
                  <div className="photo-panel"><span className="photo-label anime-label"><i className="fa-solid fa-clapperboard" /> {copy.labels.animeFrame}</span><img src={card.animeImg} alt="Anime frame" /></div>
                  <div className="photo-panel"><span className="photo-label real-label"><i className="fa-solid fa-location-dot" /> {copy.labels.realLife}</span><img src={card.realImg} alt="Real life" /></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <FansSection language={language} />

      {/* COSPLAY */}
      <section className="sec cos-sec" id="cosplay">
        <div className="w">
          <div className="sec-hd">
            <div className="sec-kicker">{copy.cosplay.kicker}</div>
            <h2 className="sec-title">{copy.cosplay.titleTop}<br />{copy.cosplay.titleBottom}</h2>
          </div>
          <div className="cos-intro">
            <div>
              <p style={{ color: "var(--mute)", marginBottom: "1rem" }}>
                {copy.cosplay.intro}
              </p>
              <div style={{ fontFamily: "var(--fm)", fontSize: ".7rem", border: "1px solid rgba(255,45,85,.3)", display: "inline-block", padding: ".6rem 1.5rem", borderRadius: "40px" }}>
                <i className="fa-solid fa-calendar-days" /> {copy.cosplay.dates}
              </div>
            </div>
            <div className="cos-intro-img">
              <img src="https://a.storyblok.com/f/178900/3940x2346/b67b19aed8/2d3b293bf9bbbf8f92c90148d5d88f9b1660746713_main.jpg" alt="Cosplay gathering" />
            </div>
          </div>
          <div className="cos-grid">
            {conventionsData.map((c) => (
              <div className="conv-card" key={c.name}>
                <div className={"conv-date " + (c.dateClass || "")}>
                  <div className="conv-month">{pick(c.month, language)}</div>
                  <div className="conv-day">{c.day}</div>
                </div>
                <div className="conv-body">
                  <div className="conv-country"><i className="fa-solid fa-flag" style={{ color: c.flag }} /> {pick(c.country, language)}</div>
                  <h4 className="conv-name">{c.name}</h4>
                  <div className="conv-city">{pick(c.city, language)}</div>
                  <p className="conv-desc">{pick(c.desc, language)}</p>
                  <img className="conv-img-large" src={c.img} alt={c.name} />
                  <div className="conv-tags">{pick(c.tags, language).map((t) => <span className="conv-tag" key={t}>{t}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="cos-tips">
            {animeAtlasTips.map((t) => (
              <div className="tip-card" key={pick(t.title, language)}>
                <div className="tip-icon"><i className={"fa-solid " + t.icon} /></div>
                <h4 className="tip-title">{pick(t.title, language)}</h4>
                <p className="tip-text">{pick(t.text, language)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLACES CTA BANNER */}
      <div className="places-cta-banner">
          <div className="places-cta-inner">
            <div>
              <div className="places-cta-label">{copy.cta.label}</div>
              <h2 className="places-cta-title">{copy.cta.titleTop}<br />{copy.cta.titleBottom}</h2>
              <p className="places-cta-sub">{copy.cta.sub}</p>
            </div>
            <button className="btn-places" onClick={() => navigate("/places")}>
              <i className="fa-solid fa-map-location-dot" />
              {copy.cta.button}
            </button>
          </div>
        </div>

      <footer>
        <div>
          <div className="fo-logo">ANIME ATLAS</div>
          <div className="fo-sub">{copy.footer.sub}</div>
        </div>
        <div className="fo-right">聖地巡礼<br /><span style={{ color: "var(--red)" }}>{copy.footer.note}</span></div>
      </footer>
    </>
  );
}
