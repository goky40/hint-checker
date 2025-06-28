
import React, { useState } from "react";

export function HintChecker() {
  const [hint, setHint] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sheetId = "1_VA8kIK95k1XmIhVj5_DZpFi4Ni2qR_pnvdMdvrPGr0";
  const sheetName = "Hints";
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRc2Btp2JxgkvCAJLgQsABbWpyG9XCW6ZZZhINtfYu0Qj8H53DoPhPX2PY2srp0JZmQT2UtZfSnKMdb/pub?output=csv";

  const handleCheck = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const text = await res.text();
      const rows = text.split("\n").map((row) => row.split(","));

      const input = hint.trim().toLowerCase();

      let found = false;
      for (const row of rows) {
        if (row[0] && row[0].trim().toLowerCase() === input) {
          setResult("❌ نصاب (موجود في العمود A)");
          found = true;
          break;
        } else if (row[1] && row[1].trim().toLowerCase() === input) {
          setResult("✅ ثقة (موجود في العمود B)");
          found = true;
          break;
        }
      }

      if (!found) {
        setResult("🤔 لا نعرف هذا الـ Hint.");
      }
    } catch (err) {
      setResult("⚠️ خطأ في الاتصال بالشيت.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🔍 Hint Checker</h1>
      <input
        type="text"
        placeholder="أدخل Hint هنا"
        value={hint}
        onChange={(e) => setHint(e.target.value)}
        style={{ padding: "0.5rem", marginRight: "1rem" }}
      />
      <button onClick={handleCheck} disabled={loading}>
        {loading ? "جارٍ التحقق..." : "تحقق"}
      </button>
      {result && <p style={{ marginTop: "1rem" }}>{result}</p>}
    </div>
  );
}
