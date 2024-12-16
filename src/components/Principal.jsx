import "./Principal.css";
import { useEffect, useState } from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
];

function Principal() {
  const [sourceLang, setsourceLang] = useState("pt");
  const [targetLang, setTargetLang] = useState("en");
  const [sourceText, setsourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  // Effect to trigger translation when text or languages change
  useEffect(() => {
    if (sourceText.trim() !== "") {
      HandleTranslate();
    }
  }, [sourceText, sourceLang, targetLang]);

  // Function to perform translation
  const HandleTranslate = async () => {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${sourceText}&langpair=${sourceLang}|${targetLang}`);

    if (!response.ok) {
      throw new Error(`HTTP ERROR: ${response.status}`);
    }
    const data = await response.json();
    setTranslatedText(data.responseData.translatedText);
  };

  // Function to swap languages and texts
  const swapTranslate = () => {
    const tempLang = sourceLang;
    setsourceLang(targetLang);
    setTargetLang(tempLang);

    const tempText = sourceText;
    setsourceText(translatedText);
    setTranslatedText(tempText);
  };

  return (
    <div className="container">
      <div className="container-top">
        <select value={sourceLang} onChange={event => setsourceLang(event.target.value)}>
          {languages.map((lang) => (
            <option className="opc" key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <button className="troca" onClick={swapTranslate}>Swap</button>
        <select value={targetLang} onChange={event => setTargetLang(event.target.value)}>
          {languages.map((lang) => (
            <option className="opc" key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <div className="container-translate">
        <div className="perg">
          <textarea
            value={sourceText}
            onChange={event => setsourceText(event.target.value)}
            className="perg-area"
            placeholder="Type the text you want to translate"
          ></textarea>
        </div>
        <div className="resp">
          <p className="texto">{translatedText}</p>
        </div>
      </div>
    </div>
  );
}

export default Principal;
