import { Navbar } from "./components/Navbar";
import { SignUp } from "./pages/Signup";
import { GoogleIcon } from "./icons/GoogleIcon";
import { GithubIcon } from "./icons/Github";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import BlogCard from "./components/BlogCard";

function App() {

  return (
    <>
      {/* <SignUp /> */}
      {/* <Login /> */}
      <Navbar />
      {/* <Profile />  */}
      <BlogCard post={'feature'},/>
    </>
  )
}

export default App
