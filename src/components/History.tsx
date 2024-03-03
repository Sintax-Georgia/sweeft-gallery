import { AppContext } from "../customHooks/useAppContext";
import React, { useContext, useState } from "react";
import styles from "./Home.module.css";
export default function History() {
  const { searchedData } = useContext(AppContext);
  const [showHistory, setShowHistory] = useState(false);
  const [historyLink, sethistoryLink] = useState("");

  return (
    <div>
      <div className={styles.historyHeadings}>
        {searchedData.map((data) => (
          <React.Fragment key={data.key}>
            <h4
              onClick={(e: React.MouseEvent<HTMLHeadingElement>) => {
                const target = e.target as HTMLHeadingElement;
                const textContent = target.textContent;
                if (textContent !== null) {
                  sethistoryLink(textContent);
                  setShowHistory(true);
                }
                if (textContent === historyLink) setShowHistory(false);
              }}
            >
              {data.key}
            </h4>
          </React.Fragment>
        ))}
      </div>
      <div className={styles.imageContainer}>
        {showHistory &&
          searchedData
            .filter((photo) => photo.key === historyLink)
            .map((photo) => {
              return photo.data.map((photo) => (
                <img
                  className={styles.image}
                  key={photo.id}
                  src={photo.urls.small}
                  alt={photo.id}
                />
              ));
            })}
      </div>
    </div>
  );
}
