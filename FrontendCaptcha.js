import { useEffect, useRef, useState } from "react";

const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const toPersian = (num) =>
  num
    .toString()
    .split("")
    .map((d) => persianNumbers[+d])
    .join("");
const toPersianWord = (num) =>
  ["یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"][num - 1];

const operators = [
  { symbol: "+", fn: (a, b) => a + b },
  { symbol: "-", fn: (a, b) => a - b },
  { symbol: "×", fn: (a, b) => a * b },
];

function generateCaptcha() {
  let num1 = Math.floor(1 + Math.random() * 9);
  let num2 = Math.floor(1 + Math.random() * 9);
  const op = operators[Math.floor(Math.random() * operators.length)];

  if (op.symbol === "-") {
    if (num1 < num2) [num1, num2] = [num2, num1];
    if (num1 === num2) num1 += 1;
  }

  const isWordOnLeft = Math.random() < 0.5;

  const left = isWordOnLeft ? toPersianWord(num1) : toPersian(num1);
  const right = isWordOnLeft ? toPersian(num2) : toPersianWord(num2);
  const answer = op.fn(num1, num2).toString();

  const question = `${right} ${op.symbol} ${left}`;
  return { question, answer };
}

export default function FrontendCaptcha({ onValidate }) {
  const canvasRef = useRef(null);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [input, setInput] = useState("");

  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear + background
    ctx.fillStyle = "#f7f7f7";
    ctx.fillRect(0, 0, 200, 60);

    // Noise lines
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = "#ccc";
      ctx.beginPath();
      ctx.moveTo(Math.random() * 200, Math.random() * 60);
      ctx.lineTo(Math.random() * 200, Math.random() * 60);
      ctx.stroke();
    }

    // Text
    ctx.font = "bold 28px Tahoma";
    ctx.fillStyle = "#567c8d";
    ctx.textAlign = "center";
    ctx.fillText(`؟ = ${captcha.question}`, 100, 38);
  };

  useEffect(() => {
    drawCaptcha();
  }, [captcha]);

  useEffect(() => {
    onValidate(input.trim() === captcha.answer);
  }, [input, captcha.answer]);

  const refresh = () => {
    setCaptcha(generateCaptcha());
    setInput("");
  };

  return (
    <div style={{ marginTop: "10px", textAlign: "center", width: "100%" }}>
      <canvas
        ref={canvasRef}
        width={200}
        height={60}
        style={{ borderRadius: "6px", border: "1px solid #ccc" }}
      />
      <div style={{ marginTop: "8px", display: "flex", gap: "5px" }}>
        <input
          type="text"
          placeholder="پاسخ"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            textAlign: "center",
          }}
        />
        <button
          onClick={refresh}
          type="button"
          title="تغییر تصویر"
          style={{
            padding: "0 10px",
            background: "#eee",
            border: "1px solid #ccc",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          🔁
        </button>
      </div>
    </div>
  );
}
