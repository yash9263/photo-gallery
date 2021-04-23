import react from "react";
import "./ImageGrid.css";
import useFirestore from "../hooks/useFirestore";
import ImageBar from "./ImageBar";

const ImageGrid = () => {
  const { docs } = useFirestore("images");
  // console.log(docs);
  // console.log(docs["likes"].length());

  return (
    <div className="container">
      {docs &&
        docs.map((doc) => {
          return (
            <div key={doc.id}>
              <div className="card">
                <img src={doc.url} loading="lazy" alt="image" />
              </div>
              <ImageBar
                id={doc.id}
                url={doc.url}
                totalLikes={doc.likes.length}
                totalComments={doc.comments}
              />
            </div>
          );
        })}
    </div>
  );
};

export default ImageGrid;
