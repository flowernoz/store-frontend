import axios from "../../api";
import { GoSearch } from "react-icons/go";
import { useState } from "react";
import { Link } from "react-router-dom";

function SearchBar() {
  const [searchResult, setSearchResult] = useState(null);
  const [value, setValue] = useState("");
  function search(value) {
    let e = value.trimStart();
    setValue(e);
    if (e) {
      axios
        .post("/pro/search", { value: e })
        .then((res) => {
          setSearchResult(res.data.innerData);
        })
        .catch((res) => console.log(res));
    } else {
      setSearchResult(null);
    }
  }
  return (
    <div
      style={searchResult && { borderRadius: "23px 23px 0 0" }}
      className="header__searchbar"
    >
      <input
        value={value}
        type="text"
        placeholder="Tovarlarni izlash..."
        onChange={(e) => search(e.target.value)}
      />
      <button>
        {" "}
        <GoSearch />{" "}
      </button>

      <div
        className="searchResult"
        style={{ display: searchResult?.length ? "flex" : "none" }}
      >
        {searchResult?.map((item, index) => (
          <Link onClick={() => setSearchResult(null)} to={"/"} key={index}>
            <GoSearch />
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
