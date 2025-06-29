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
