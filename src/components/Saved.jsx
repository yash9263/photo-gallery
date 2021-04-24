import React from "react";
import userImages from "../hooks/userImages";

function Saved() {
  const { userDocs } = userImages("accounts");
  // setUserDocs(docs);
  //   console.log(userDocs);

  return (
    <div className="lg:grid grid-cols-4 grid-cols-1 gap-4 lg:mx-32 my-3">
      {userDocs.savedImages &&
        userDocs.savedImages.map((image, index) => {
          return (
            <div
              key={index}
              className="max-w-sm rounded overflow-hidden shadow-lg"
            >
              <img src={image.url} className="w-full" />
            </div>
          );
        })}
    </div>
  );
}

export default Saved;
