import firebase from 'firebase/app';
import { createContext, useEffect, useState } from 'react';

export const firebaseContext = createContext();

const FirebaseProvider = (props) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unsub = firebase.auth().onAuthStateChanged((user) => {
            user ? setAuthUser(user) : setAuthUser(null);
        });
        return () => unsub();
    });

    return <firebaseContext.Provider value={authUser}>
        {props.children}
    </firebaseContext.Provider>;
}

export default FirebaseProvider;