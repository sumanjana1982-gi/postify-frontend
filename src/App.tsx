import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />

        <Route path="/posts" element={<Posts />} />

        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;