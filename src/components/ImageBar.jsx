import { useEffect, useContext, useState } from "react";
import React from "react";
import { firebaseContext } from "../hooks/FirebaseProvider";
import { projectFirestore } from "../firebase/config";
import firebase from "firebase/app";

const ImageBar = ({ id, url, totalLikes, totalComments }) => {
  // console.log(totalLikes);
  const user = useContext(firebaseContext);
  const [comment, setComment] = useState(null);
  const imageCollectionRef = projectFirestore.collection("images").doc(id);
  const accountCollectionRef =
    user && projectFirestore.collection("accounts").doc(user.uid);
  const commentText = (event) => {
    setComment(event.target.value);
  };
  const likeHandler = () => {
    imageCollectionRef.update({
      likes: firebase.firestore.FieldValue.arrayUnion(user.displayName),
    });
  };
  const commentHandler = (event) => {
    event.preventDefault();
    imageCollectionRef.update({
      comments: firebase.firestore.FieldValue.arrayUnion({
        displayName: user.displayName,
        comment: comment,
      }),
    });
  };
  const saveHandler = () => {
    accountCollectionRef.update({
      savedImages: firebase.firestore.FieldValue.arrayUnion({
        displayName: user.displayName,
        url: url,
      }),
    });
  };
  return (
    <div>
      <button onClick={likeHandler}>
        <span>{totalLikes}</span>like
      </button>
      <form>
        <input type="text" placeholder="comment" onChange={commentText} />
        <button type="submit" onClick={commentHandler}>
          post
        </button>
      </form>
      <button onClick={saveHandler}>save</button>
      <div>share</div>
      <div>enlarge</div>
    </div>
  );
};

export default ImageBar;
