import react from "react";
import useFirestore from "../hooks/useFirestore";
import ImageBar from "./ImageBar";

const ImageGrid = () => {
  const { docs } = useFirestore("images");
  // console.log(docs);
  // console.log(docs["likes"].length());

  return (
    <div className="lg:grid grid-cols-4 grid-cols-1 gap-4 lg:mx-32">
      {docs &&
        docs.map((doc) => {
          return (
            <div
              key={doc.id}
              className="max-w-sm rounded overflow-hidden shadow-lg"
            >
              <img
                className="w-full"
                src={doc.url}
                loading="lazy"
                alt="image"
              />

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
