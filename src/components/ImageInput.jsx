import react, { useContext, useState } from "react";
import ProgressBar from "./ProgressBar";
import { firebaseContext } from "../hooks/FirebaseProvider";

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
  return (
    <form>
      <label>
        {user && <input type="file" onChange={changeHadler} />}
        <span>+</span>
      </label>
      <div>
        {error && <div>{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};
export default ImageInput;
