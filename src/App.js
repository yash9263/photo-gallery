import react from 'react';
import Home from './components/Home';
import ImageInput from './components/ImageInput';
import LoginSnack from './components/LoginSnack';
import Navbar from './components/Navbar';
import FirebaseProvider from './hooks/FirebaseProvider';
import "./styles.css";

export default function App() {
  return (
    <FirebaseProvider>
      <div className="App">
        <Navbar />
        {/* <LoginSnack /> */}
        {/* <ImageInput /> */}
      </div>
    </FirebaseProvider>
  );
}
