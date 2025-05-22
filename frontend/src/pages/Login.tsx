import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { GoogleIcon } from "../icons/GoogleIcon";
import { GithubIcon } from "../icons/Github";
import { useAuthStore } from "../store/useAuthStore";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {

  const navigate = useNavigate();
  const { login, loading, error } = useAuthStore();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if(!email || !password){
      alert("Email and password are requied")
      return;
    }

    await login(email, password)
  const token = localStorage.getItem("token");

    if (token) {
      navigate("/posts");
    } else {
      alert("Login failed. Please try again.");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen m-0 bg-custom-ash-300 ">
        <div className="bg-white p-7 w-full max-w-[400px] shadow-lg rounded-lg">

          <h2 className="mb-2.5 text-custom-ash-900 font-bold text-center text-lg">Welcome back!</h2>
          <p className="mb-2.5 text-center">Please enter your details to login.</p>

          <form onSubmit={handleLogin}>
            <div className={`${divStyles}`}>
              <label className={`${labelStyles}`}>Email</label>
              <Input

               ref={emailRef}
               type="text"
               placeholder="@email.com"
              />
            </div>
            <div className={`${divStyles} `}>
              <label className={`${labelStyles}`}>Password</label>
              <Input
                ref={passwordRef}
                type="password"
                placeholder="********" />
            </div>
            {loading ?
              <p className="text-center text-sm text-gray-500">Logging in...</p>
            :
              <Button variant="login" text="Login"
                type="submit"
              />
            }
          </form>
          <div className="mt-4 text-center">
            Don't have an account? <a href="/register"
              className="no-underline text-blue-500"
              >Register</a>
          </div>

          <div className="mt-4">
            <Button
                variant="login"
                icon={<GoogleIcon /> }
                onClick={() => alert("Clicked")}/>
          </div>
          <div className="mt-4">
            <Button
                variant="login"
                icon={<GithubIcon /> }
                onClick={() => alert("Clicked")}/>
          </div>
        </div>
    </div>
  )
}

let labelStyles = "block mb-3";
const divStyles = "mb-3.5";
