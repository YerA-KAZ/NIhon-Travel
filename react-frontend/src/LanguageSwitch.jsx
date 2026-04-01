import { LANGUAGE_OPTIONS } from "./siteCopy";

export default function LanguageSwitch({ language, setLanguage }) {
  return (
    <div className="lang-switch" role="group" aria-label="Language switch">
      {LANGUAGE_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`lang-btn${language === option.value ? " active" : ""}`}
          onClick={() => setLanguage(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
