import React from "react";
import userImages from "../hooks/userImages";

function Saved(props) {
  const { userDocs } = userImages("accounts");
  // setUserDocs(docs);
  //   console.log(userDocs);

  return (
    <div>
      My Images
      {userDocs.savedImages &&
        userDocs.savedImages.map((image, index) => {
          return (
            <div key={index}>
              <img src={image} />
            </div>
          );
        })}
    </div>
  );
}

export default Saved;
