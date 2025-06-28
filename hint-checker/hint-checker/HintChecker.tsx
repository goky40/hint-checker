import React, { useState } from "react";

export function HintChecker() {
  const [hint, setHint] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sheetId = "1_VA8kIK95k1XmIhVj5_DZpFi4Ni2qR_pnvdMdvrPGr0"; // ID من رابط الشيت
  const sheetName = "Sheet1"; // غيّره حسب اسم الورقة في الشيت
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

  const handleCheck = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const text = await res.text();
      const rows = text.split("\n").map((row) => row.split(","));

      const allHints = rows.flat().map((h) => h.trim().toLowerCase());
      const isValid = allHints.includes(hint.trim().toLowerCase());

      setResult(isValid ? "✅ Hint موجود!" : "❌ Hint غير موجود.");
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
