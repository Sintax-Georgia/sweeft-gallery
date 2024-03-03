import { useContext } from "react";
import axios from "axios";
import { ACCESS_KEY, BASE_URL } from "../const.tsx";
import { AppContext, TPhoto } from "./useAppContext.tsx";

const useFetchPhotos = () => {
  const { setPhotos, setLoading, setSearchedData, searchedData, page } =
    useContext(AppContext);
  const fetchPopularPhotos = async (page: number) => {
    try {
      setLoading(true);
      const response = await axios.get<TPhoto[]>(`${BASE_URL}photos`, {
        params: {
          order_by: "popular",
          per_page: 20,
          page: page,
          client_id: `${ACCESS_KEY}`,
        },
      });
      setPhotos((prev) => [...prev, ...response.data]);

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch popular photos:", error);
      setLoading(false);
    }
  };
  const fetchMorePhotos = async (search: string) => {
    //

    if (search) {
      fetchSearchedPhotos(search, page);
    } else {
      fetchPopularPhotos(page);
    }
  };
  const fetchSearchedPhotos = async (search: string, page: number) => {
    try {
      setLoading(true);
      const response = await axios.get<TPhoto[] | any>(
        `${BASE_URL}search/photos`,
        {
          params: {
            query: search,
            per_page: 20,
            page: page,
            client_id: `${ACCESS_KEY}`,
          },
        }
      );
      if (!searchedData.some((item) => item.key === search)) {
        setPhotos(response.data.results);
      } else {
        setPhotos((prev) => [...prev, ...response.data.results]);
      }
      setLoading(false);
      if (!searchedData.some((item) => item.key === search)) {
        setSearchedData((prev) => [
          ...prev,
          { key: search, data: response.data.results },
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch searched photos:", error);
      setLoading(false);
    }
  };

  return { fetchPopularPhotos, fetchSearchedPhotos, fetchMorePhotos };
};

export default useFetchPhotos;
