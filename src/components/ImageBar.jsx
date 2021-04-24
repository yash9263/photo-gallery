import { useEffect, useContext, useState } from "react";
import React from "react";
import { firebaseContext } from "../hooks/FirebaseProvider";
import { projectFirestore } from "../firebase/config";
import firebase from "firebase/app";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import ShareIcon from "@material-ui/icons/Share";
import LoginSnack from "./LoginSnack";
import Modal from "./Modal";

const ImageBar = ({ id, url, totalLikes, totalComments }) => {
  // console.log(totalLikes);
  const user = useContext(firebaseContext);
  const [comment, setComment] = useState(null);
  const [viewComment, setviewcomment] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImg, setSelctedImg] = useState(null);
  const [showurl, setShowurl] = useState(false);
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
    setComment("");
  };
  const saveHandler = () => {
    accountCollectionRef.update({
      savedImages: firebase.firestore.FieldValue.arrayUnion({
        displayName: user.displayName,
        url: url,
      }),
    });
  };
  const showComments = () => {
    setviewcomment(!viewComment);
  };

  const errorHandler = () => {
    if (user) {
      setError("");
    } else {
      setError("Please Login");
    }
  };
  const modalHandler = () => {
    setSelctedImg(url);
  };
  const shareHandler = () => {
    setShowurl(!showurl);
  };

  console.log(totalComments);
  return (
    <div className="px-6 pt-4 pb-2">
      <div>
        <button
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          onClick={user ? likeHandler : errorHandler}
        >
          <FavoriteBorderIcon />
        </button>
        <span>{totalLikes} likes</span>
      </div>
      {viewComment &&
        totalComments.map((eachComment, index) => {
          return (
            <div className="overflow-y-auto h-12 flex">
              <div>{eachComment.displayName}</div>
              <p>{eachComment.comment}</p>
            </div>
          );
        })}
      <form>
        <label>
          <span
            onClick={showComments}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            <ChatBubbleOutlineIcon /> show comments
          </span>
        </label>
        <input
          type="text"
          placeholder="comment"
          onChange={commentText}
          value={comment}
        />
        <button
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          onClick={user ? commentHandler : errorHandler}
        >
          post
        </button>
      </form>
      <button
        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        onClick={user ? saveHandler : errorHandler}
      >
        <BookmarkBorderIcon />
      </button>
      <div
        className="cursor-pointer inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        onClick={shareHandler}
      >
        <ShareIcon />
      </div>
      <div
        onClick={modalHandler}
        className="cursor-pointer inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
      >
        <AspectRatioIcon />
      </div>
      {showurl && <div>Image Url: {url}</div>}
      {error && <LoginSnack message={error} />}
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelctedImg={setSelctedImg} />
      )}
    </div>
  );
};

export default ImageBar;
