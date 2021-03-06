import { useContext, useState } from "react";
import { firebaseContext } from "../../hooks/FirebaseProvider";
import { projectFirestore } from "../../firebase/config";
import firebase from "firebase/app";
import "./Card.scss";
import Comments from "./Comments";

function Card({ id, owner, url, likes, comments, height }) {
  const [viewComments, setViewComments] = useState(false);
  const [error, setError] = useState(null);
  const user = useContext(firebaseContext);

  const imageCollectionRef = projectFirestore.collection("images").doc(id);
  const accountCollectionRef =
    user && projectFirestore.collection("accounts").doc(user.uid);

  const likeHandler = () => {
    if (!likes.includes(user.displayName)) {
      imageCollectionRef.update({
        likes: firebase.firestore.FieldValue.arrayUnion(user.displayName),
      });
    } else {
      imageCollectionRef.update({
        likes: firebase.firestore.FieldValue.arrayRemove(user.displayName),
      });
    }
  };

  const saveHandler = () => {
    accountCollectionRef.update({
      savedImages: firebase.firestore.FieldValue.arrayUnion({
        displayName: user.displayName,
        url: url,
      }),
    });
  };

  const errorHandler = (e) => {
    e.preventDefault();
    if (user) {
      setError("");
    } else {
      setError("Please Login");
    }
  };

  return (
    <div className="card-container">
      <div className="user-info-container">
        <div className="avatar-cont">
          <img src="https://picsum.photos/400/300" alt="avatar" />
        </div>
        <div className="user-name">{owner}</div>
      </div>
      <div className="post-cont" style={{ height: height }}>
        <img src={url} alt="post" />
      </div>
      <div className="post-icons">
        <i
          onClick={user ? likeHandler : errorHandler}
          className={
            user && likes.includes(user.displayName)
              ? "fas fa-heart liked-icon"
              : "fas fa-heart"
          }
        ></i>
        <i
          onClick={() => setViewComments(!viewComments)}
          className="fas fa-comment"
        ></i>
        <i
          className="fas fa-location-arrow"
          onClick={() => {
            navigator.clipboard.writeText(url);
          }}
        ></i>
        <i
          className="fas fa-bookmark save-icon"
          onClick={user ? saveHandler : errorHandler}
        ></i>
      </div>
      <div className="num-cont">
        <div className="likes-text">{likes.length} likes</div>
        <Comments
          id={id}
          comments={comments}
          viewComments={viewComments}
          setViewComments={setViewComments}
        />
      </div>
    </div>
  );
}

export default Card;
