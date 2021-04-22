import react, { useState } from "react";
import firebase from 'firebase/app';
import {projectFirestore, timestamp} from '../firebase/config';

const SignUp = () => {

    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);

    function nameChangeHandler (event) {
        setUserName(event.target.value);
    }


    function changeHadler (event) {
        const value = event.target.value;
        const type = event.currentTarget.name;
        console.log(type);
        if (type == 'email') {
            setEmail(value);
        } else if (type == 'password') {
            setPassword(value);
        }
    }

    const SignUpWithEmail = (event) => {
        event.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log(userCredential);
            const useruid = userCredential.uid;
            const createdAt = timestamp();
            projectFirestore.collection('accounts').doc(useruid).set({
                displayName: userName,
                userImages: [],
                savedImages: [],
                createdAt: createdAt
            })
            
        })
        .catch((error) => {
            console.log(error);
            setError(error.message);
        })
    }

    return <div>
            Sign up
            <form action="">
                <label htmlFor="name">
                    <input type="text" placeholder='name' onChange={nameChangeHandler} required/>
                </label>
                <label htmlFor="email">
                    <input type="email" name="email" onChange={changeHadler} id="email" placeholder='abc@email.com' required/>
                </label>
                <label htmlFor="password">
                    <input type="password" name="password" onChange={changeHadler} id="password" placeholder='password' required/>
                </label>
                <button type="submit" onClick={SignUpWithEmail}>submit</button>
            </form>
            <button >Sign up using google</button>
    </div>
}

export default SignUp;