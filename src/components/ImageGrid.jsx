import useFirestore from "../hooks/useFirestore";
import Card from "./card/Card";
import "./imageGrid/ImageGrid.scss";
import Masonry from "react-masonry-css";

const ImageGrid = () => {
  const { docs } = useFirestore("images");
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {docs &&
        docs.map((doc, index) => {
          return (
            <Card
              key={doc.id}
              id={doc.id}
              url={doc.url}
              likes={doc.likes}
              comments={doc.comments}
              owner={doc.owner}
              height={index % 2 == 0 ? "14em" : "18em"}
            />
          );
        })}
    </Masonry>
  );
};

export default ImageGrid;
