import { useNavigate } from "react-router-dom";
import logo from "../Assets/Logo_White.png";
import "./Card.css";

const ContentCard = (props) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/detail", { state: props.data, replace: true });
  };

  return (
    <div className="card-container" onClick={onClickHandler}>
      <img
        src={props.data.fields.thumbnail ? props.data.fields.thumbnail : logo}
      />
      {props.data.webTitle && <h1>{props.data.webTitle}</h1>}
      {props.data.fields.headline && <p>{props.data.fields.headline}</p>}
    </div>
  );
};

export default ContentCard;
