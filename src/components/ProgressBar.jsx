import react, { useEffect, useState } from "react";
import useStorage from "../hooks/useStorage";
import "./ProgressBar.css";

const ProgressBar = ({ file, setFile }) => {
  const { progress, url } = useStorage(file);
  console.log(progress, url);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);
  return (
    <div className="wrapper">
      <div className="top" style={{ width: progress + "%" }}></div>
    </div>
  );
};

export default ProgressBar;
