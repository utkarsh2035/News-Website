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
      `${url}${apiKey}&q=${encodeURIComponent(query)}&language=en`
    );
    const data = await res.json();
    const withImages = (data.results || []).filter(item => item.image_url);
    const mapped = withImages.map(item => ({
      urlToImage: item.image_url,
      url: item.link,
      publishedAt: item.pubDate,
      source: { name: item.source_id },
      title: item.title,
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

 <nav className="w-full bg-slate-900 flex flex-wrap md:flex-nowrap justify-between items-center fixed backdrop-blur-md font-sans z-10 px-4 py-2 gap-4">
  <div className="h-12 md:h-16 flex-shrink-0">
    <img
      ref={navImgRef}
      src="/newsLogo.jpeg"
      alt="BuzzScope Logo"
      className="h-full w-auto rounded-lg"
      onClick={reload}
    />
  </div>

  <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
    {categories.map((cat, i) => (
      <p
        key={cat}
        ref={(el) => (itemsRef.current[i] = el)}
        onClick={() => handleCategoryClick(cat)}
        className={`cursor-pointer transition-all ${
          activeCategory === cat
            ? "highlight border-b-2 border-sky-400"
            : ""
        }`}
      >
        {cat}
      </p>
    ))}
  </div>

  <div className="flex flex-wrap sm:flex-nowrap gap-2 md:gap-4 w-full md:w-auto">
    <input
      type="search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      ref={searchbarRef}
      id="searchbar"
      className="border-2 border-sky-400 flex-grow md:flex-grow-0 md:w-64 rounded-lg py-1 px-2 font-light bg-transparent"
      placeholder="e.g. Science"
    />
    <button
      type="button"
      onClick={handleSearch}
      ref={searchBtnRef}
      className="border-2 border-sky-400 py-1 px-2 rounded-lg bg-sky-400 text-slate-950 font-bold"
    >
      Search
    </button>
  </div>
</nav>


      <div className="pt-28 flex flex-wrap justify-center gap-4">
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
