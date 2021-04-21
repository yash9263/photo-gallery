import react, { useState } from "react";
import ProgressBar from "./ProgressBar";

const ImageInput = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpeg"];

  function changeHadler(event) {
    const fileSelected = event.target.files[0];
    // console.log(fileSelected);
    if (fileSelected && types.includes(fileSelected.type)) {
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
        <input type="file" onChange={changeHadler} />
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
