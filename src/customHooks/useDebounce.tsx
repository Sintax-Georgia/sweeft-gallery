import { useEffect, useContext } from "react";
import { AppContext } from "./useAppContext";
import useFetchPhotos from "./useFecthPhotos";
import styles from "../components/Home.module.css";

const InputWithDebounce = () => {
  const { searchedData, setPhotos, search, setSearch } = useContext(AppContext);
  const { fetchMorePhotos } = useFetchPhotos();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchedData.some((item) => item.key === search)) {
        const data = searchedData.filter((val) => val.key === search);
        setPhotos(data[0].data);
      } else {
        fetchMorePhotos(search);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);
  return (
    <input
      value={search}
      name="search"
      placeholder="search"
      className={styles.search}
      onChange={(e) => {
        setSearch(e.target.value);
      }}
    />
  );
};

export default InputWithDebounce;
