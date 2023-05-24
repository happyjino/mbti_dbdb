const MyRadio = ({ name, type, value, text, checked = "", onChange }) => {

  return (
    <label className="check-container">
      <input
        type="radio"
        className="check-point input-value"
        name={name}
        value={value}
        style={{ display: "none" }}
        checked={checked === `${value}`}
        onChange={onChange}
      />
      <span className={`check-box`} style={{ textAlign: "center" }}>
        {text}
      </span>
    </label>
  );
}

export default MyRadio;