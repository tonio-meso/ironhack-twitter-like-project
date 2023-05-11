import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import AvatarCreator from "./Pages/AvatarCreator";
// import AvatarCreator from "./Pages/AvatarCreator";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/AvatorCreator" element={<AvatarCreator />} />
        {/* <Route element={<Header />} /> */}
        {/* <Route path="/AvatarCreator" element={<AvatarCreator />} /> */}
      </Routes>
    </>
  );
}

export default App;
