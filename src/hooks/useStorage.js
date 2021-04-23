import { useState, useEffect, useContext } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp
} from "../firebase/config";
import {firebaseContext} from '../hooks/FirebaseProvider';
import firebase from 'firebase/app';

const useStorage = (file, fileName) => {
  const [progress, setProgress] = useState(0);
  const [error, setErrror] = useState(null);
  const [url, setUrl] = useState(null);
  const user = useContext(firebaseContext);
  // console.log(user.uid);

  useEffect(() => {
    // console.log(file);
    const storageRef = projectStorage.ref(file.name);
    const imageCollectionRef = projectFirestore.collection("images");
    const accountCollectionRef = projectFirestore.collection('accounts').doc(user.uid);

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
        const likes = [];
        const comments = [];
        const owner = user.displayName;
        imageCollectionRef.add({ owner, url, createdAt, likes, comments });
        setUrl(url);
        console.log(user.uid);
        projectFirestore.collection('accounts').doc(user.uid).get()
        .then((doc) => {
          if(doc.exists) {
            console.log(doc);
          } else {
            console.log('no data');
          }
        }).catch((error) => console.error(error));

        projectFirestore.collection('accounts').doc(user.uid).update({
          userImages: firebase.firestore.FieldValue.arrayUnion(url)
        })
        .catch((error) => {
          console.error(error);
        })
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
