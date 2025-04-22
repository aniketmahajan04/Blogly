import { User } from "lucide-react"

export const Profile = () => {

  return (
    <div>
      {/* Profile detailes div */}
      <div className="flex justify-center items-center h-screen w-full bg-red-400">
      {/* profile card div */}
        <div className="flex flex-col items-center w-[80%] h-[80%] bg-yellow-300 rounded-2xl shadow-xl">
        
        {/* user img and name div */}
          <div className="flex items-center bg-blue-400 p-2 w-[90%] mt-1">
            <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center ml-8">
              <img src="C:\Users\gaura\Videos\Screenshots" />
            </div>
            <div className="ml-8 h-20 p-4 text-center">
              <h3 className="font-bold text-xl">
                John Doe
              </h3>
            </div>
          </div>
        {/* 1 div end */}

        </div>
      </div>
    </div>
  )
}
