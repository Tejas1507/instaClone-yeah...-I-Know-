import { Navigate, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Feeds from "./pages/feedsPage/feeds";
import CreatePost from "./pages/createPostPage/createPost";
import Login from "./pages/loginPage/login";
import Profile from "./pages/profilePage/profile";
import PageLayout from "./layouts/pageLayout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

function App() {
  const [authUser] = useAuthState(auth);
  return (
    <>
      <PageLayout>
        <Routes>
          <Route
            path="/"
            element={authUser ? <Feeds /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/:username" element={<Profile />} />
        </Routes>
      </PageLayout>
    </>
  );
}

export default App;
