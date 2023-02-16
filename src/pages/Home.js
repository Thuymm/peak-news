import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bookmarkOn from "../Assets/bookmarkon-icon@2x.svg";
import ContentCard from "../components/ContentCard";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import TitleCard from "../components/TitleCard";
import * as apiService from "../utils/ApiService";
import "./Main.css";

const Home = () => {
  const navigate = useNavigate();
  const [topStories, setTopStories] = useState([]);
  const [sportNews, setSportNews] = useState([]);
  const [selectedOption, setSelectedOption] = useState("newest");

  useEffect(() => {
    apiService
      .getTopStories(selectedOption)
      .then((response) => setTopStories(response.results));

    apiService
      .getSports(selectedOption)
      .then((response) => setSportNews(response.results));
  }, [selectedOption]);

  const viewBookmarkHandler = () => {
    navigate("bookmark");
  };

  const onChangeHandler = () => {
    setSelectedOption(document.getElementById("filter").value);
  };

  return (
    <div>
      <Header />
      {!sportNews.length || !topStories.length ? (
        <Loader />
      ) : (
        <div className="content-container">
          <div className="content-headline">
            <h1>Top Stories</h1>
            <div className="content-action">
              <CustomButton
                onClick={viewBookmarkHandler}
                text="VIEW BOOKMARK"
                icon={bookmarkOn}
              />
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

          <div className="grid-container">
            <ContentCard key={topStories[0].id} data={topStories[0]} />
            <div className="grid-container-extra">
              <ContentCard key={topStories[1].id} data={topStories[1]} />
              <ContentCard key={topStories[2].id} data={topStories[2]} />
              <TitleCard key={topStories[3].id} data={topStories[3]} />
              <TitleCard key={topStories[4].id} data={topStories[4]} />
            </div>
          </div>

          <div className="category-grid-container">
            <ContentCard key={topStories[5].id} data={topStories[5]} />
            <ContentCard key={topStories[6].id} data={topStories[6]} />
            <ContentCard key={topStories[7].id} data={topStories[7]} />
          </div>

          <h1>Sports</h1>
          <div className="category-grid-container">
            {sportNews.map((item) => (
              <ContentCard key={item.id} data={item} />
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
