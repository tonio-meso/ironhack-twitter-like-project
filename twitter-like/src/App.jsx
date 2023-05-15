import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import AvatarCreator from "./Pages/AvatarCreator";
import DescriptionPage from "./Pages/DescriptionPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/avatar-creator" element={<AvatarCreator />} />
        <Route path="/description-page/:_id" element={<DescriptionPage />} />
      </Routes>
    </>
  );
}

export default App;
