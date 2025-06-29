# Persian Math CAPTCHA 🧮🇮🇷

A lightweight, accessible math CAPTCHA component in Persian (Farsi), designed for React apps. It randomly generates visual math challenges using numbers and words (e.g., "سه + ۵"), helping protect forms against bots.

## ✨ Features

- Persian digits and number words
- Random math operations: `+`, `-`, `×`
- Mixed numeric/word format (e.g. "سه + ۵" or "۸ − چهار")
- Canvas-based CAPTCHA rendering
- Prevents negative or zero answers
- Easy to validate user input
- Refreshable image
- Custom styling options

## 🔧 Tech Stack

- React
- HTML5 Canvas

## 🚀 Usage

```jsx
import FrontendCaptcha from "./FrontendCaptcha";

function MyForm() {
  const [captchaValid, setCaptchaValid] = useState(false);

  const handleSubmit = () => {
    if (!captchaValid) {
      alert("Please solve the CAPTCHA correctly.");
      return;
    }
    // Continue submission...
  };

  return (
    <>
      <FrontendCaptcha onValidate={setCaptchaValid} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
