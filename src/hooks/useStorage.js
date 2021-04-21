import { useState, useEffect } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp
} from "../firebase/config";

const useStorage = (file, fileName) => {
  const [progress, setProgress] = useState(0);
  const [error, setErrror] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // console.log(file);
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection("images");

    storageRef.put(file).on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
        // console.log("Uploaded a file");
      },
      (err) => {
        setErrror(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        collectionRef.add({ url, createdAt });
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
