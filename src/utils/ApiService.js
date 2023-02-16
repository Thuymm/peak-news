import fetchTimeOut from "./FetchWithTimeOut";

const controller = new AbortController();

const getTopStories = async (
  orderby = "newest",
  q = "",
  page = 1,
  pageSize = 8
) => {
  return await fetchTimeOut(
    `https://content.guardianapis.com/search?q=${q}&section=news&page=${page}&page-size=${pageSize}&format=json&show-fields=trailText,body,headline,thumbnail,main&show-elements=all&order-by=${orderby}&api-key=test`,
    3000,
    { signal: controller.signal }
  )
    .then((res) => res.json())
    .then((response) => response.response);
};

const getSports = async (orderby = "newest", q = "", page = 1) => {
  return await fetchTimeOut(
    `https://content.guardianapis.com/search?q=${q}&section=sport|culture|lifeandstyle&page=${page}&page-size=3&format=json&show-fields=trailText,body,headline,thumbnail,main&show-elements=all&order-by=${orderby}&api-key=test`,
    3000,
    { signal: controller.signal }
  )
    .then((res) => res.json())
    .then((response) => response.response);
};

export { getTopStories, getSports };
