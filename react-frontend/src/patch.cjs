const fs = require('fs');
const filepath = 'c:/Users/toph8/OneDrive/Desktop/japan-travel (4) — копия/japan-travel/react-frontend/src/AnimeAtlasPage.jsx';

let text = fs.readFileSync(filepath, 'utf8');

text = text.replace(
  'import { animeAtlasCopy, animeAtlasTips, pick } from "./siteCopy";',
  'import { animeAtlasCopy, animeAtlasTips, pick, irlCards, fansPanels, conventionsData } from "./siteCopy";'
);

const irlStart = text.indexOf('<div className="irl-stack">');
const irlEnd = text.indexOf('</section>', irlStart);
text = text.substring(0, irlStart) +
`<div className="irl-stack">
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
      ` + text.substring(irlEnd);

const fpanelsStart = text.indexOf('<div className={`fpanel${active === "ghibli" ? " on" : ""}`}>');
const fpanelsEnd = text.indexOf('</section>', fpanelsStart);
text = text.substring(0, fpanelsStart) +
`{Object.entries(fansPanels).map(([key, panel]) => (
          <div className={\`fpanel\${active === key ? " on" : ""}\`} key={key}>
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
    ` + text.substring(fpanelsEnd);

const conventionsDefStart = text.indexOf('const CONVENTIONS = [');
const conventionsDefEnd = text.indexOf('];', text.indexOf('const TIPS = [')) + 2;
// Remove CONVENTIONS and TIPS entirely from file
text = text.substring(0, conventionsDefStart) + text.substring(conventionsDefEnd);


const cosGridStart = text.indexOf('<div className="cos-grid">');
const cosGridEnd = text.indexOf('</div>', text.indexOf('))}')) + 6;
text = text.substring(0, cosGridStart) +
`<div className="cos-grid">
            {conventionsData.map((c) => (
              <div className="conv-card" key={c.name}>
                <div className={\`conv-date \${c.dateClass}\`}>
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
          ` + text.substring(cosGridEnd);

fs.writeFileSync(filepath, text);
