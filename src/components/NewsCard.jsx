import React from "react";

const formatTimestamp = (isoTimestamp) => {
  const date = new Date(isoTimestamp);
  return date.toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
};

const NewsCard = ({ article }) => {
  return (
    <div
      className="image-box h-full w-full sm:w-80 md:w-96 bg-slate-900/10 backdrop-blur-sm ml-0 md:ml-4 mt-8 flex flex-col gap-4 cursor-pointer"
      onClick={() => window.open(article.url, "_blank")}
    >
      <div className="h-60 overflow-hidden">
        <img
          src={article.urlToImage}
          alt="News"
          className="card-image object-cover h-full w-full aspect-auto"
        />
      </div>

      <div className="px-4">
        <h1 className="card-title font-sans font-bold text-base md:text-xl">
          {article.title}
        </h1>
      </div>

      <div className="px-4 text-xs md:text-sm font-light">
        <p className="card-info">
          {article.source.name} - {formatTimestamp(article.publishedAt)}
        </p>
      </div>

      <div className="px-4 text-sm md:text-base font-normal">
        <p className="news-para">{article.description}</p>
      </div>
    </div>
  );
};

export default NewsCard;
