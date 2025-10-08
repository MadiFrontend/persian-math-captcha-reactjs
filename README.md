# Persian Math CAPTCHA 🧮🇮🇷

A lightweight, accessible Persian (Farsi) math CAPTCHA component for React.  
It randomly generates math challenges using a mix of Persian digits and words (e.g., "سه × ۵") and renders them visually with Canvas.  
Perfect for protecting forms against bots while keeping UX simple and localized.

---

## ✨ Features

- Fully Persian numbers and words  
- Random math operations: `+`, `-`, `×`  
- Mixed number/word expressions (e.g., "سه + ۵", "۸ − چهار")  
- Canvas-based CAPTCHA rendering  
- Avoids zero/negative results  
- Refreshable CAPTCHA  
- Easy integration and external validation  
- Customizable styles  

---

## 🔧 Tech Stack

- **React**
- **HTML5 Canvas**

---

## 🚀 Usage Example

```jsx
import { useState } from "react";
import FrontendCaptcha from "./FrontendCaptcha";

export default function MyForm() {
  const [captchaData, setCaptchaData] = useState({});

  const handleSubmit = () => {
    const { input, answer, refresh } = captchaData;

    if (input === answer) {
      alert("✅ کپچا درست است");
    } else {
      alert("❌ کپچا اشتباه بود، سوال جدید ساخته شد");
      refresh?.(); // Refresh CAPTCHA if wrong
    }
  };

  return (
    <div>
      <FrontendCaptcha onChange={setCaptchaData} />
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "12px",
          padding: "8px 16px",
          borderRadius: "6px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        ثبت
      </button>
    </div>
  );
}
```

🧠 How It Works
The CAPTCHA randomly generates a Persian math question (e.g., "دو × ۴").

The user enters the answer in the input field.

On every input change, the component calls onChange, passing an object:
```jsx
{
  input: "8",          // User input
  answer: "8",         // Correct answer
  refresh: () => {...} // Function to regenerate CAPTCHA
}
```
You can validate it externally in your form and call refresh() whenever needed.

🧩 Props
Prop	Type	Description
onChange	(data: { input, answer, refresh }) => void	Called whenever input or CAPTCHA changes.

🖌️ Customization
You can easily modify:

Canvas size and colors

Font styles (ctx.font, ctx.fillStyle, etc.)

Border, layout, and spacing of the input and refresh button

📜 License
MIT © 2025 – Designed with ❤️ for Persian users.
