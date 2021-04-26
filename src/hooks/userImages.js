import react, { useState, useEffect, useContext } from 'react';
import { projectFirestore } from '../firebase/config';
import { firebaseContext } from "../hooks/FirebaseProvider";

const userImages = (collection) => {
    const user = useContext(firebaseContext);
    const [userDocs, setUserDocs] = useState({});

    useEffect(() => {

        const unsub = user && projectFirestore.collection(collection).doc(user.uid)
            .onSnapshot((doc) => {
                // console.log(doc.data());
                let documents = { ...doc.data() }
                // console.log(documents);
                setUserDocs(documents);


            })

        return () => unsub();

    }, [collection])

    return { userDocs };
}

export default userImages;