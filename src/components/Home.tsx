import styles from "./Home.module.css";
import { AppContext, TPhoto } from "../customHooks/useAppContext.tsx";
import { useCallback, useContext, useEffect, useRef } from "react";
import InputWithDebounce from "../customHooks/useDebounce.tsx";
import useFetchPhotos from "../customHooks/useFecthPhotos.tsx";

export default function Home() {
  const observationRef = useRef<IntersectionObserver | null>(null);

  const {
    photos,
    loading,
    search,
    page,
    setPage,
    setSelectedPhoto,
    selectedPhoto,
  } = useContext(AppContext);
  const { fetchMorePhotos } = useFetchPhotos();

  const lastUserRef = useCallback((node: HTMLImageElement) => {
    if (observationRef.current) observationRef.current.disconnect();

    observationRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => ++prev);
          window.scrollBy({
            top: window.scrollY,
            behavior: "smooth",
          });
        }
      },
      { threshold: 1 }
    );
    if (node) observationRef.current.observe(node);
  }, []);

  useEffect(() => {
    if (page > 1) {
      fetchMorePhotos(search);
    }
  }, [page]);
  function handleClick(photo: TPhoto) {
    console.log(photo);
    setSelectedPhoto(photo);
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.headingContainer}>
        <h1>Photo Gallery</h1>
      </div>
      <InputWithDebounce />
      {loading ? (
        <h1>Loading...</h1>
      ) : selectedPhoto ? (
        <div>
          <div className={styles.modalWindow}>
            <div className={styles.modalHeading}>
              <h2>{selectedPhoto.alt_description}</h2>
              <button onClick={() => setSelectedPhoto(null)}>X</button>
            </div>
            <p>{selectedPhoto.description || selectedPhoto.slug}</p>
            <p>
              Likes:
              <strong>{selectedPhoto.likes}</strong>
            </p>
          </div>
          <img src={selectedPhoto.urls.raw} />
        </div>
      ) : (
        <div className={styles.imageContainer}>
          {photos.length === 0 ? (
            <h1>No such photo</h1>
          ) : (
            photos.map((photo: TPhoto, index: number) => {
              const isLast = index === photos.length - 1;
              return (
                <img
                  onClick={() => handleClick(photo)}
                  ref={isLast ? lastUserRef : null}
                  className={styles.image}
                  key={photo.id}
                  src={photo.urls.small}
                  alt={photo.description}
                />
              );
            })
          )}
          {/* <div ref={bottom}></div> */}
        </div>
      )}
    </div>
  );
}
