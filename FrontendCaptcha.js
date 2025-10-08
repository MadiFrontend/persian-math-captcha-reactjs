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
  let num1, num2, product;
  do {
    num1 = Math.floor(2 + Math.random() * 8);
    num2 = Math.floor(2 + Math.random() * 8);
    product = num1 * num2;
  } while (product < 10 || product > 100);

  const op = operators.find((o) => o.symbol === "×");
  const isWordOnLeft = Math.random() < 0.5;

  const left = isWordOnLeft ? toPersianWord(num1) : toPersian(num1);
  const right = isWordOnLeft ? toPersian(num2) : toPersianWord(num2);
  const answer = op.fn(num1, num2).toString();

  const question = `${right} ${op.symbol} ${left}`;
  return { question, answer };
}

export default function FrontendCaptcha({ onChange }) {
  const canvasRef = useRef(null);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [input, setInput] = useState("");

  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#f7f7f7";
    ctx.fillRect(0, 0, 200, 60);

    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = "#ccc";
      ctx.beginPath();
      ctx.moveTo(Math.random() * 200, Math.random() * 60);
      ctx.lineTo(Math.random() * 200, Math.random() * 60);
      ctx.stroke();
    }

    ctx.font = "bold 28px Tahoma";
    ctx.fillStyle = "#567c8d";
    ctx.textAlign = "center";
    ctx.fillText(`؟ = ${captcha.question}`, 100, 38);
  };

  useEffect(() => {
    drawCaptcha();
  }, [captcha]);

  useEffect(() => {
    onChange({
      input: input.trim(),
      answer: captcha.answer,
      refresh: () => {
        setCaptcha(generateCaptcha());
        setInput("");
      },
    });
  }, [input, captcha]);

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
          onChange={(e) => setInput(e.target.value.replace(/\D/g, ""))}
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            textAlign: "center",
          }}
        />
        <button
          onClick={() => {
            setCaptcha(generateCaptcha());
            setInput("");
          }}
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
