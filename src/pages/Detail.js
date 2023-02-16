import Snackbar from "awesome-snackbar";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import bookmarkOff from "../Assets/bookmarkoff-icon@2x.svg";
import bookmarkOn from "../Assets/bookmarkon-icon@2x.svg";
import CustomButton from "../Components/CustomButton";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import "./Detail.css";

const Detail = () => {
  const { state } = useLocation();
  const [bookmarkToggle, setBookmarkToggle] = useState(false);

  const formattedDate = new Date(state.webPublicationDate).toUTCString();

  useEffect(() => {
    const bookmark = localStorage.getItem("bookmark");
    if (bookmark !== null) {
      const bookmarkData = JSON.parse(bookmark);
      if (bookmarkData.filter((item) => item.id === state.id).length > 0) {
        setBookmarkToggle(!bookmarkToggle);
      }
    }
  }, []);

  const bookmarkHandler = () => {
    var temp = null;
    const bookmark = localStorage.getItem("bookmark");
    if (bookmark === null) {
      temp = [state];
    } else {
      const bookmarkData = JSON.parse(bookmark);
      if (bookmarkData.filter((item) => item.id === state.id).length > 0) {
        temp = bookmarkData.filter((item) => item.id !== state.id);
        new Snackbar("REMOVED FROM BOOKMARKS", {
          timeout: 3000,
          position: "bottom-center",
          iconSrc: bookmarkOn,
          style: {
            container: [["background-color", "red"]],
            message: [["color", "white"]],
          },
        });
      } else {
        bookmarkData.push(state);
        temp = bookmarkData;
        new Snackbar("SAVED TO BOOKMARKS", {
          timeout: 3000,
          position: "bottom-center",
          iconSrc: bookmarkOn,
          style: {
            container: [["background-color", "green"]],
            message: [["color", "white"]],
          },
        });
      }
    }
    localStorage.setItem("bookmark", JSON.stringify(temp));
    setBookmarkToggle(!bookmarkToggle);
  };

  return (
    <div>
      <Header />
      <main className="container">
        <div>
          <CustomButton
            text={bookmarkToggle ? "REMOVE BOOKMARK" : "ADD BOOKMARK"}
            icon={bookmarkToggle ? bookmarkOff : bookmarkOn}
            onClick={bookmarkHandler}
          />
          <br />
          <p className="date">{formattedDate}</p>
          <h1>{state.webTitle}</h1>
          <h3>{parse(state.fields.trailText)}</h3>
          <hr />
          {parse(state.fields.body)}
        </div>
        {(state.fields.main || state.fields.thumbnail) && (
          <div className="thumbnail">
            {state.fields.main ? (
              parse(state.fields.main)
            ) : state.fields.thumbnail ? (
              <img src={state.fields.thumbnail} />
            ) : (
              ""
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Detail;
