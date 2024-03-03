// AppContext.tsx
import React, { ReactNode, createContext, useState } from "react";

interface AppContextType {
  photos: TPhoto[];
  setPhotos: React.Dispatch<React.SetStateAction<TPhoto[]>>;
  searchedData: TSearchedData[];
  setSearchedData: React.Dispatch<React.SetStateAction<TSearchedData[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  windowScroll: number;
  setWindowScroll: React.Dispatch<React.SetStateAction<number>>;
  selectedPhoto: TPhoto | null;
  setSelectedPhoto: React.Dispatch<React.SetStateAction<TPhoto | null>>;
}

type Props = {
  children: ReactNode;
};
export type TPhoto = {
  length: number;
  id: string;
  description: string;
  likes: number;
  slug: string;
  alt_description: string;
  urls: {
    small: string;
    full: string;
    raw: string;
  };
  key: string;
};

type TSearchedData = {
  key: string;
  data: TPhoto[];
};
export const AppContext = createContext<AppContextType>({
  photos: [],
  setPhotos: () => {},
  searchedData: [],
  setSearchedData: () => {},
  loading: false,
  setLoading: () => {},
  page: 1,
  setPage: () => {},
  search: "",
  setSearch: () => {},
  windowScroll: 1,
  setWindowScroll: () => {},
  selectedPhoto: null,
  setSelectedPhoto: () => {},
});

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const [windowScroll, setWindowScroll] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPhoto, setSelectedPhoto] = useState<TPhoto | null>(null);
  const [photos, setPhotos] = useState<TPhoto[]>([]);
  const [searchedData, setSearchedData] = useState<TSearchedData[]>([]);

  return (
    <AppContext.Provider
      value={{
        photos,
        setPhotos,
        searchedData,
        setSearchedData,
        loading,
        setLoading,
        page,
        setPage,
        search,
        setSearch,
        windowScroll,
        setWindowScroll,
        selectedPhoto,
        setSelectedPhoto,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
