import { useState, useContext } from "react";
import firebase from "firebase/app";
import { firebaseContext } from "../../hooks/FirebaseProvider";
import { projectFirestore } from "../../firebase/config";
import "./Comments.scss";
export default function Comments({
  id,
  comments,
  viewComments,
  setViewComments,
}) {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const user = useContext(firebaseContext);
  const imageCollectionRef = projectFirestore.collection("images").doc(id);

  let allComments = comments.map((_comment) => (
    <div className="comment-cont">
      <span>{_comment.displayName}</span>
      <p>{_comment.comment}</p>
    </div>
  ));

  function commentHandler(event) {
    event.preventDefault();
    imageCollectionRef.update({
      comments: firebase.firestore.FieldValue.arrayUnion({
        displayName: user.displayName,
        comment: text,
      }),
    });
    setText("");
  }

  const errorHandler = (e) => {
    e.preventDefault();
    if (user) {
      setError("");
    } else {
      setError("Please Login");
    }
  };

  return (
    <div className="comment-section">
      {viewComments
        ? allComments
        : comments.length > 0 && (
            <div
              className="show-comments"
              onClick={() => setViewComments(!viewComments)}
            >
              View {comments.length} comments
            </div>
          )}
      <div className="comment-form">
        <input
          type="text"
          name="comment"
          placeholder="Add a comment..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button onClick={user ? commentHandler : errorHandler}>Post</button>
      </div>
    </div>
  );
}
