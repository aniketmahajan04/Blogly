import { Input } from "../components/Input.tsx";

export const SignUp = () => {

  return (
    <div className="flex justify-center items-center h-screen m-0 bg-custom-ash-300 ">
        <div className="bg-white p-7 w-full max-w-[400px] shadow-[0_4px_6px_rgba(0,0,0,0.1] rounded-md">
          
          <form>
            <div className="mb-3.5">
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
          </form>
        </div>
    </div>
  )
}

let labelStyles = "block mb-3"
