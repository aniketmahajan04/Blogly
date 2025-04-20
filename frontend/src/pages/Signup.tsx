import { Button } from "../components/Button.tsx";
import { Input } from "../components/Input.tsx";

export const SignUp = () => {

  return (
    <div className="flex justify-center items-center h-screen m-0 bg-custom-ash-300 ">
        <div className="bg-white p-7 w-full max-w-[400px] shadow-lg rounded-lg">
          
          <h2 className="mb-2.5 text-custom-ash-900 font-bold text-center text-lg">Welcome!</h2>
          <p className="mb-2.5 text-center">Please enter your details to signup.</p>
          
          <form>
            <div className={`${divStyles}`}>
              <label className={`${labelStyles}`}>Username</label>
              <Input type="text" placeholder="Username"/>
            </div>
            <div className="mb-3.5">
              <label className={`${labelStyles}`}>Email</label>
              <Input type="text" placeholder="@email.com" />
            </div>
            <div className="mb-3.5">
              <label className={`${labelStyles}`}>Password</label>
              <Input type="password" placeholder="********" />
            </div>
            <Button text="SignUp"
                onClick={() => alert("clicked")}
            />
          </form>
          <div className="mt-4 text-center">
            Already have an account? <a href="#" 
              className="no-underline text-blue-500"
              >Login</a>
          </div>
        </div>
    </div>
  )
}

let labelStyles = "block mb-3";
const divStyles = "mb-3.5";
