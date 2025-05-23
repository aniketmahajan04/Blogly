import { SignUp } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import PostDetailPage from "./pages/PostDetailPage";
import { Posts } from "./pages/Posts";
import PostEditor from "./pages/PostEditor";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path='/' element={<Home />} /> */}
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/post"
            element={
              <ProtectedRoutes>
                <PostDetailPage />
              </ProtectedRoutes>
            }
          />
          <Route path="/" element={
            <ProtectedRoutes>
              <Posts />
            </ProtectedRoutes>
          }
          />

          <Route
            path="/write"
            element={ <PostEditor /> }
          >
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
