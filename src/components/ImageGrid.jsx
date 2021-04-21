import react from "react";
import "./ImageGrid.css";
import useFirestore from "../hooks/useFirestore";

const ImageGrid = () => {
  const { docs } = useFirestore("images");
  // console.log(docs);

  return (
    <div className="container">
      {docs &&
        docs.map((doc) => {
          return (
            <div key={doc.id} className="card">
              <img src={doc.url} loading="lazy" alt="image" />
            </div>
          );
        })}
    </div>
  );
};

export default ImageGrid;
