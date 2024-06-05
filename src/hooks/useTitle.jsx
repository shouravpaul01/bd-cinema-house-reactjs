import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `BDCinemaHouse-${title}`;
  }, [title]);
};

export default useTitle;
