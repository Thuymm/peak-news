import { useEffect, useState } from "react";
import ContentCard from "../Components/ContentCard";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Loader from "../Components/Loader";
import "./Main.css";

const Bookmark = () => {
  const [bookmark, setBookmark] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("newest");

  useEffect(() => {
    const data = localStorage.getItem("bookmark");
    if (data !== null) setBookmark(JSON.parse(data));
    setLoading(false);
  }, []);

  const onChangeHandler = () => {
    setSelectedOption(document.getElementById("filter").value);
  };

  return (
    <div>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <div className="content-container">
          <div className="content-headline">
            <h1>All Bookmark</h1>
            <div className="content-action">
              <select
                id="filter"
                onChange={onChangeHandler}
                value={selectedOption}
                className="dropdown"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {bookmark.length > 0 && (
            <div className="category-grid-container">
              {selectedOption === "newest"
                ? bookmark
                    .sort(
                      (a, b) =>
                        new Date(b.webPublicationDate) -
                        new Date(a.webPublicationDate)
                    )
                    .map((item) => <ContentCard key={item.id} data={item} />)
                : bookmark
                    .sort(
                      (a, b) =>
                        new Date(a.webPublicationDate) -
                        new Date(b.webPublicationDate)
                    )
                    .map((item) => <ContentCard key={item.id} data={item} />)}
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Bookmark;
