import React, { useState } from "react";
import bgImage from "./assets/bg.jpg";

const HintChecker = () => {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const t = {
    title: lang === "ar" ? "أساطير الوسط" : "Mediation Legends",
    placeholder: lang === "ar" ? "ابحث هنا ..." : "search  here...",
    check: lang === "ar" ? "تحقق" : "Check",
    notFound: lang === "ar" ? "🤔 لا نعرف هذا الـ او مشكوك ." : "🤔 We don't recognize this him.",
    scammer: lang === "ar" ? "❌ نصاب " : "❌ Scammer ",
    trusted: lang === "ar" ? "✅ ثقة " : "✅ Trusted ",
    aboutBtn: lang === "ar" ? "من نحن" : "About Us",
    language: lang === "ar" ? "اللغة" : "Language",
  };

  const handleCheck = async () => {
    const url =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRc2Btp2JxgkvCAJLgQsABbWpyG9XCW6ZZZhINtfYu0Qj8H53DoPhPX2PY2srp0JZmQT2UtZfSnKMdb/pub?output=csv";
    const res = await fetch(url);
    const text = await res.text();
    const rows = text.trim().split("\n").map((row) => row.split(","));

    const foundInA = rows.find((r) => r[0]?.trim() === input.trim());
    const foundInB = rows.find((r) => r[1]?.trim() === input.trim());

    if (foundInA) setResult(t.scammer);
    else if (foundInB) setResult(t.trusted);
    else setResult(t.notFound);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "40px",
          borderRadius: "16px",
          width: "90%",
          maxWidth: "450px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>{t.title}</h1>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginRight: "10px", fontWeight: "bold" }}>{t.language}:</label>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as "ar" | "en")}
            style={{ padding: "6px", borderRadius: "6px" }}
          >
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </div>

        <input
          type="text"
          placeholder={t.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            marginBottom: "10px",
            fontSize: "16px",
          }}
        />
        <button
          onClick={handleCheck}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          {t.check}
        </button>

        <div style={{ marginTop: "20px", fontSize: "18px", minHeight: "40px" }}>{result}</div>

        <a
          href="https://www.facebook.com/groups/772359552803401/members"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: "30px",
            display: "inline-block",
            padding: "8px 16px",
            fontSize: "15px",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {t.aboutBtn}
        </a>
      </div>
    </div>
  );
};

export default HintChecker;
