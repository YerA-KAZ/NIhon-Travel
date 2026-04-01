const fs = require('fs');
const path = 'c:/Users/toph8/OneDrive/Desktop/japan-travel (4) — копия/japan-travel/react-frontend/src/AnimeAtlasPage.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Replacements for Imports
content = content.replace(
  'import { animeAtlasCopy, animeAtlasTips, pick } from "./siteCopy";',
  'import { animeAtlasCopy, animeAtlasTips, pick, irlCards, fansPanels, conventionsData } from "./siteCopy";'
);

// 2. Replace irlCards section
const irlStartIndex = content.indexOf('<div className="irl-stack">');
const irlEndIndex = content.indexOf('</div>\n        </div>\n      </section>\n\n      <FansSection language={language} />');
const irlReplacement = `<div className="irl-stack">
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
          </div>`;
content = content.slice(0, irlStartIndex) + irlReplacement + content.slice(irlEndIndex - 10); // Keep original end structure properly.
// let's do more robust replacement:
