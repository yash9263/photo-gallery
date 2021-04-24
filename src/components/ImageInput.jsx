import react, { useContext, useState } from "react";
import ProgressBar from "./ProgressBar";
import { firebaseContext } from "../hooks/FirebaseProvider";
import LoginSnack from "./LoginSnack";

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
      setFile(null);
    }
  }

  return (
    <form className="mx-auto">
      <div className="border-2 border-gray-400 my-5 inline-block p-2 rounded">
        <label className="cursor-pointer border-black">
          <span className="">Select an Image</span>
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
