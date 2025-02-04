import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constant";
import { chacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showsuggestions, setshowsuggestions] = useState(false);
  const searchcache = useSelector((store) => store.search);
  const dispatch = useDispatch();

  useEffect(() => {
    //api call

    //make an api call after every key press
    //but if the differnt bw 2 APIcalL IS < 200ms
    //decline the api call
    const timer = setTimeout(() => {
      if (searchcache[searchQuery]) {
        setSuggestions(searchcache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    console.log("API CALL-" + searchQuery);

    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    // console.log(json[1]);
    setSuggestions(json[1]);

    //update cache
    dispatch(
      chacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-2">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAMAAAC8EZcfAAAARVBMVEX///8AAAD19fXo6OhDQ0Pv7+9JSUkbGxu8vLzJycmMjIz4+PjBwcGCgoJRUVFzc3MmJiaZmZkgICBeXl56enplZWVWVlaT91pBAAABgElEQVR4nO3b246CMBhFYebASSkqHt7/UWeYCdaLtmK82JtkfU+wEkMtP21VAQAAAAAAAOvtP2X2z+vqITStTBOGutzXNx9iTV/qC+q8Wcj37dRt/3a5vk5dtugyz8eoDluM6SelV3dF6QfloM6KDsnAozorOiYD1VWPthk4qauiKRl4UWdF6T8Tm3U6t1LXN3XX4pbZ0gzqsMWQ7vPfLFTVSd02O+X7fv+P5WvNVNywzonX8VtmvD7L+1PLrKkDAAAA8J76S2bNnr8L50bmHDLj6bu+Vb92tsX3OovRQmGwYNG35e8k7uM3m+lbbv5mNAK+JAP5TvKCbQba/8T2D4n9MmO/UNv/1flvFkwKC33+G9bKfss/M39pAgAAAPAm76NR5ofL3I/nuR9wtBgsFEYLNvO3zCFbn/skmfGbzfQtN38zGgGnj8rLV5gofdlAXfVom4H230nsL13ZX1vzWagzF/98VuoNfydxv77rfwHa/wr5zPsSPgAAAAAAAHD3AycCPgunKl+TAAAAAElFTkSuQmCC"
          alt="hamburger menu"
        />

        <a href="/">
          <img
            className="h-8 mx-2"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAAe1BMVEX///8AAACZmZkrKyszMzOmpqby8vLu7u7q6uqlpaX39/dycnJbW1u3t7f7+/ve3t7Ozs56enpoaGhJSUmNjY1CQkI7Ozu+vr6srKyDg4NtbW1jY2NRUVGTk5N9fX28vLwdHR0TExPX19fHx8ciIiI+Pj5GRkYLCwudnZ2IWwrDAAAE0klEQVR4nO2d4XKqMBBGKVUEBUFURMVWrVrf/wmvlnpbrQgmG3czfuevUzo5AyS72SyOAwAAAAAAAAAAAAAAAAAAAAAAANyk63X8OJlEeTtwR9NBb5bO52FYDIe7cZa1vni9QvlLlo13w2ERhuE8nfUG05EbtPNoksR+x+tyj8wYXpxEwWLUC7ebzxdzLLMinS6CKIk73CMmohMt0vHSoLIqk9t0Efnco9fD27ceL+5MomvxbTjidVcy7XNrUOOD4ZG9xiriNqHCG7e2H3rcLu6nx+3sNyG3jXspuI2dM+T2cR9Tbl+XDLiN3MM7t62/tLmdNKfD7eoa9iyhBU26P8y4rTTF5zZ1nZjbS0NEBBt/Sbm9NKPL7akKj9tMIwROuyU5t5lGiJw4jtgxeTDnqKpZcptpgthX38uLDbm/NbekahJuNw3IuSVVs+d20wCxM4cdeb8dt6RqWtxuGmByI1IXbjf1eNyKbiE/7I25Fd3ig9tOLRPlsb0SeqpAfs7UVR5b4A8ITV1lxG2nFvV1i3t48g3vMMlfuYTKY3OPf742KrDgtlOLesLALS+wHhP6umDD66YBK+WxuadLTDIyXxd8cppphPrY3J+LvJtKevF5aYZGusr9fR1DiQfp+XqNLV73/Eq5iehP+mavRtBxoc/pt+m0nZAetRHqO8TP5FueawYl96CRa/6rj16g9Hzzh/rQruk7CJzRyZOfM1DPGFTocxyfsNJy8lAZ9xPR6zu8UOdU+qSXORvR5zgJUSgsXZ/GcveWvsOcNKTQJ71Ow5i+w6xEkE99Yn0UobB0fRqRQr2+w6tVM5KTnq03rM9x9loCn16f0w+gT0Of43TVIznoO6IcCkNfiacWyUHfCT+FPg19SrkE6fo0psW79cX333+BiTET8jh9scqGPPSV+GopGOn6HvPuU86gSn/3PUKfRiUW9HUX6v/i6fVpBGzQ5+jcec+ur99eadp7Yn0E8p5Y34Skcly6PkN7HRFR2b30vQ4j+ij22J5WH9UWuQ36yKsMEpLt8RPSqwyI9dFVt5RI10daYaWQ0KtBeoUVYX1fh7Syr0R6fV+iPrRzfb6RHnbSi3OJaps9Q0f6n6I0vK+bGahEuj6N7mknfV31M621SD/XoXEW/1ufgdMcP4hva68+tC99+YpM1TW47dSiXj/mGpf3suK2U4t6dL//MHYQ9cQrt51ahDVsPkf+aXJR3cIvkd/LQGjj0hL5nTQ0Ui7mkZ7uE92+T/6BSqEdw09IDzocnXWzebjdNMD44k2dMbebBhhvRKWODV+d0Dm1Yhjpm+RHNPLNppE/8YpuHym9Cc4XD2hjqIYNnV8FR702zByCwzbpe+QlYl9+4jP1JUL7hsvPVpUI7T1sQcBbInLysOXmE/qpLBs+1vGNwMlXfqb0F+IeXzvWfP8RtuEmf4vtAuKyUD2s+z6vqLzfG7cLFaR8m3wpvSK3gr6I8OOtz+1BGW/P/M27zd6KHF81frQIWZ7iZbiILFoq38SLkyhYjHrhdmPwU1Cfm6yYTd0gSmLLb7obdL2OHyeTKG8H7mg66M3S+TwMi2K4G2+z1hevVyh/ybbj3bAownA+T2e9wXTkBnkeTZLY73iWJKQAAAAAAAAAAAAAAAAAAAAAAADw8Q9WBl8yGUo1GgAAAABJRU5ErkJggg=="
            alt="logo"
          />
        </a>
      </div>

      <div className="col-span-10  px-10">
        <div>
          <input
            className="px-5 w-1/2 rounded-l-full border-gray-400 p-2"
            placeholder="Search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setshowsuggestions(true)}
          />
          <button className="border border-gray-400 p-2 rounded-r-full bg-gray-100">
            🔍
          </button>
        </div>

        {showsuggestions && (
          <div className="fixed px-2 py-2  bg-white rounded-lg w-[32rem] shadow-lg  border border-gray-100">
            <ul>
              {suggestions.map((s) => (
                <li key={s} className="py-2 px-3 shadow-md hover:bg-gray-100">
                  🔍{s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className="h-8"
          alt="user"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1VTcdzIfHrD1mnqlyyYKPHFSOvDM4YCOVIA&s"
        />
      </div>
    </div>
  );
};

export default Head;
