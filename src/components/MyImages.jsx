import react, { useContext, useState } from "react";
import userImages from "../hooks/userImages";

function MyImages() {
  //   const [userDocs, setUserDocs] = useState(null);

  const { userDocs } = userImages("accounts");
  // setUserDocs(docs);
  //   console.log(userDocs);

  return (
    <div>
      My Images
      {userDocs.userImages &&
        userDocs.userImages.map((image, index) => {
          return (
            <div key={index}>
              <img src={image} />
            </div>
          );
        })}
    </div>
  );
}

export default MyImages;
