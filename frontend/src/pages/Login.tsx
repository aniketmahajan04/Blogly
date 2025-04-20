import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { GoogleIcon } from "../icons/GoogleIcon";
import { GithubIcon } from "../icons/Github";

export const Login = () => {

  return (
    <div className="flex justify-center items-center h-screen m-0 bg-custom-ash-300 ">
        <div className="bg-white p-7 w-full max-w-[400px] shadow-lg rounded-lg">
          
          <h2 className="mb-2.5 text-custom-ash-900 font-bold text-center text-lg">Welcome back!</h2>
          <p className="mb-2.5 text-center">Please enter your details to login.</p>
          
          <form>
            <div className={`${divStyles}`}>
              <label className={`${labelStyles}`}>Email</label>
              <Input type="text" placeholder="@email.com" />
            </div>
            <div className={`${divStyles} `}>
              <label className={`${labelStyles}`}>Password</label>
              <Input type="password" placeholder="********" />
            </div>
            <Button text="Login"
                onClick={() => alert("clicked")}
            />
          </form>
          <div className="mt-4 text-center">
            Don't have an account? <a href="#" 
              className="no-underline text-blue-500"
              >Register</a>
          </div>

          <div className="mt-4">
            <Button 
                icon={<GoogleIcon /> }
                onClick={() => alert("Clicked")}/>
          </div>
          <div className="mt-4">
            <Button 
                icon={<GithubIcon /> }
                onClick={() => alert("Clicked")}/>
          </div>
        </div>
    </div>
  )
}

let labelStyles = "block mb-3";
const divStyles = "mb-3.5";