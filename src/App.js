import ImageInput from "./components/ImageInput";
import ImageGrid from "./components/ImageGrid";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>InstaClone</h1>
      <ImageInput />
      <ImageGrid />
    </div>
  );
}
