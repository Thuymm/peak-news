import { useNavigate } from "react-router-dom";
import "./Card.css";

const ContentCard = (props) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("detail", { state: props.data, replace: true });
  };

  return (
    <div className="card-container" onClick={onClickHandler}>
      {props.data.webTitle && <h1>{props.data.webTitle}</h1>}
    </div>
  );
};

export default ContentCard;
