import react, { useState } from 'react';
import firebase from 'firebase/app';
import  'firebase/auth';

const SignIn = () => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);

    function changeHadler (event) {
        const value = event.target.value;
        const type = event.currentTarget.name;
        if(type == 'email') {
            setEmail(event.target.value);
        } else if (type == 'password') {
            setPassword(event.target.value);
        }
    }

    const SignInWithEmail = (event) => {
        event.preventDefault();
        if (email && password) {
            firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
                setError(error.message);
            })
        }
    }

    return <div>
        Sign In
        <form action="">
            <label htmlFor="email">
                <input type="email" name="email" onChange={changeHadler} id="email" placeholder='abc@email.com'/>
            </label>
            <label htmlFor="password">
                <input type="password" name="password" onChange={changeHadler} id="password" placeholder='password'/>
            </label>
            <button type="submit" onClick={SignInWithEmail}>submit</button>
        </form>
        <button>Sign in using google</button>
    </div>
}

export default SignIn;