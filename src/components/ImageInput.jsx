import react, { useContext, useState } from "react";
import ProgressBar from "./ProgressBar";
import { firebaseContext } from "../hooks/FirebaseProvider";
import LoginSnack from "./LoginSnack";
import "./imageInput/ImageInput.scss";

const ImageInput = () => {
  const user = useContext(firebaseContext);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpeg"];

  function changeHadler(event) {
    const fileSelected = event.target.files[0];
    // console.log(fileSelected);
    if (fileSelected && types.includes(fileSelected.type) && user) {
      setFile(fileSelected);
      setError("");
    } else {
      setFile(null);
      setError("No file selected or select a file with png or jpg format");
    }
  }

  function noUser(event) {
    if (user) {
      setError("");
    } else {
      setError("Please Login");
      setTimeout(() => {
        setError("");
      }, 4000);
      setFile(null);
    }
  }

  return (
    <form className="create-post-cont">
      <div className="post-btn">
        <label className="">
          <span className="">Create Post</span>
          <input
            type="file"
            onChange={user ? changeHadler : noUser}
            className="hidden"
          />
        </label>
      </div>
      <div>
        {error && (
          <div className="">
            <LoginSnack message={error} />
          </div>
        )}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};
export default ImageInput;
