import useFirestore from "../hooks/useFirestore";
import Card from "./card/Card";
import "./imageGrid/ImageGrid.scss";

const ImageGrid = () => {
  const { docs } = useFirestore("images");

  return (
    <div className="img-grid-cont">
      {docs &&
        docs.map((doc, index) => {
          return (
            <Card
              id={doc.id}
              url={doc.url}
              likes={doc.likes}
              comments={doc.comments}
              owner={doc.owner}
              // height={index % 2 == 0 ? "12em" : "18em"}
            />
          );
          {
            /* <div
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
            </div> */
          }
        })}
    </div>
  );
};

export default ImageGrid;
