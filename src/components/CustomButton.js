import "./CustomButton.css";

const CustomButton = ({ icon, text, onClick }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {icon && <img src={icon} />} &nbsp;
      {text}
    </button>
  );
};

export default CustomButton;
