export default function VerificationSection() {
  return (
    <div className="verification-box">
      <p>Please verify to proceed *</p>
      <div className="captcha-mock">
        <img src="/api/placeholder/200/100" alt="Captcha" />
        <div className="captcha-options">
          <label><input type="radio" name="captcha" /> crown</label>
          <label><input type="radio" name="captcha" /> umbrella</label>
        </div>
      </div>
    </div>
  );
}