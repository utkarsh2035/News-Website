import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import "./output.css";
import "./App.css";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import NewsCard from "./components/NewsCard";

const categories = ["Technology", "Finance", "Politics", "Business", "Health"];

const App = () => {
  const [articles, setArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState("India");
  const [searchQuery, setSearchQuery] = useState("");

  const navImgRef = useRef(null);
  const itemsRef = useRef([]);
  const searchbarRef = useRef(null);
  const searchBtnRef = useRef(null);
  const cursorRef = useRef(null);

  const apiKey = "pub_564616650f6fcb472d4e1f5d53c8935323abf";
  const url = "https://newsdata.io/api/1/latest?apikey=";

  useEffect(() => {
    document.body.classList.add("overflow-x-hidden");

    const mouseMoveHandler = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", mouseMoveHandler);

    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    fetchNews(activeCategory);

    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      document.body.classList.remove("overflow-x-hidden");
    };
  }, []);

  useLayoutEffect(() => {
    if (navImgRef.current) {
      gsap.fromTo(
        navImgRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }

    if (itemsRef.current.every(Boolean)) {
      gsap.fromTo(
        itemsRef.current,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
        }
      );
    }

    if (searchbarRef.current) {
      gsap.fromTo(
        searchbarRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }

    if (searchBtnRef.current) {
      gsap.fromTo(
        searchBtnRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, []);

  const fetchNews = async (query) => {
    const res = await fetch(
      ${url}${apiKey} +
      &q=${encodeURIComponent(query)} +
      &language=en
    );
    const data = await res.json();
    const withImages = (data.results || []).filter(item => item.image_url);
    const mapped = withImages.map(item => ({
      urlToImage:  item.image_url,
      url:         item.link,
      publishedAt: item.pubDate,
      source:      { name: item.source_id },
      title:       item.title,
      description: item.description
    }));

    setArticles(mapped || []);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setSearchQuery("");
    fetchNews(category);
  };

  const handleSearch = () => {
    if (!searchQuery) return;
    setActiveCategory("");
    fetchNews(searchQuery);
  };

  const reload = () => window.location.reload();

  return (
    <div className="bg-slate-950 min-h-screen w-screen m-0 p-0 box-border text-sky-400 cursor-pointer scroll-smooth">
      <div
        ref={cursorRef}
        className="cursor h-3 w-3 rounded-full bg-sky-400 fixed top-0 left-0 z-20 boxShadow"
      ></div>

      <nav className="h-20 w-full bg-slate-900 flex justify-between items-center fixed backdrop-blur-md font-sans z-10">
        <div className="h-16 overflow-hidden pl-20">
          <img
            ref={navImgRef}
            src="/newsLogo.jpeg" 
            alt="BuzzScope Logo"
            className="object-cover h-full w-full aspect-auto object-center rounded-lg"
            onClick={reload}
          />
        </div>

        <div className="items flex justify-between items-center gap-10 text-lg">
          {categories.map((cat, i) => (
            <p
              key={cat}
              ref={(el) => (itemsRef.current[i] = el)}
              onClick={() => handleCategoryClick(cat)}
              className={cursor-pointer transition-all ${
                activeCategory === cat
                  ? "highlight border-b-2 border-sky-400"
                  : ""
              }}
            >
              {cat}
            </p>
          ))}
        </div>

        <div className="searchbarflex pr-20">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            ref={searchbarRef}
            id="searchbar"
            className="border-2 border-sky-400 w-64 rounded-lg pt-1 pl-2 pr-2 pb-1 font-light bg-transparent mr-4"
            placeholder="e.g. Science"
          />
          <button
            type="button"
            onClick={handleSearch}
            ref={searchBtnRef}
            className="border-2 border-sky-400 pb-1 pt-1 pl-2 pr-2 rounded-lg bg-sky-400 text-slate-950 font-bold"
          >
            Search
          </button>
        </div>
      </nav>

      <div className="pt-20 flex flex-wrap justify-center">
        {articles.length === 0 ? (
          <p className="text-xl mt-10">No articles found.</p>
        ) : (
          articles
            .filter((article) => article.urlToImage)
            .map((article, index) => (
              <NewsCard key={index} article={article} />
            ))
        )}
      </div>
    </div>
  );
};

export default App;
