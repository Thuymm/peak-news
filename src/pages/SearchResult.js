import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useLocation, useNavigate } from "react-router-dom";
import bookmarkOn from "../Assets/bookmarkon-icon@2x.svg";
import ContentCard from "../Components/ContentCard";
import CustomButton from "../Components/CustomButton";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Loader from "../Components/Loader";
import * as apiService from "../Utils/ApiService";
import "./Main.css";

const SearchResult = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchResult, setSearchResult] = useState(null);
  const [selectedOption, setSelectedOption] = useState("newest");

  useEffect(() => {
    apiService
      .getTopStories(selectedOption, state, 1, 15)
      .then((response) => setSearchResult(response));
  }, [selectedOption, state]);

  const viewBookmarkHandler = () => {
    navigate("/bookmark");
  };

  const onChangeHandler = () => {
    setSelectedOption(document.getElementById("filter").value);
  };

  const handlePageChange = async (event) => {
    await apiService
      .getTopStories(selectedOption, state, event.selected + 1, 15)
      .then((response) => setSearchResult(response));
  };

  return (
    <div>
      <Header />
      {!searchResult ? (
        <Loader />
      ) : (
        <div className="content-container">
          <div className="content-headline">
            <h1>Search Result</h1>
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

          <div className="category-grid-container">
            {searchResult.results.map((item) => (
              <ContentCard key={item.id} data={item} />
            ))}
          </div>

          <nav className="pagination">
            <ReactPaginate
              previousLabel="previous"
              nextLabel="next"
              breakLabel="..."
              pageCount={searchResult.pages}
              onPageChange={handlePageChange}
              activeClassName="active"
              forcePage={searchResult.currentPage - 1}
            />
          </nav>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default SearchResult;
