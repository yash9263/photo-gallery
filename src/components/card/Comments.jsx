import { useState } from "react";
import "./Comments.scss";
export default function Comments({ comments }) {
  const [viewComments, setViewComments] = useState(false);

  let allComments = comments.map((_comment) => (
    <div className="comment-cont">
      <span>{_comment.displayName}</span>
      <p>{_comment.comment}</p>
    </div>
  ));

  return (
    <div className="comment-section">
      {viewComments ? (
        allComments
      ) : (
        <div onClick={() => setViewComments(!viewComments)}>
          View {comments.length} comments
        </div>
      )}
    </div>
  );
}
