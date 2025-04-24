import { Eye, LogOut, PenSquare, Trash2, User } from "lucide-react"

export const Profile = () => {

  return (
    <div>
      {/* Profile detailes div */}
      <div className="flex justify-center items-center h-screen w-full bg-red-400">
      {/* profile card div */}
        <div className="flex flex-col items-center w-[80%] h-[80%] bg-yellow-300 rounded-2xl shadow-xl">
        
        {/* 1 user img and name div */}
          <div className="flex items-center bg-blue-400 p-2 w-[90%] mt-5 rounded-lg">
            <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center ml-4">
              <img 
                src="C:\Users\gaura\Videos\Screenshots" 
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
                />
            </div>
            <div className="ml-6 flex flex-col justify-center">
              <h3 className="font-bold text-xl text-custom-ash-900">
                John Doe
              </h3>
              <span className="text-sm text-gray-800">john@doegmail.com</span>
            </div>
            <div className="ml-12 text-center">
              <h4 className="font-semibold">
                Posts
              </h4>
              <p className="text-lg font-bold">30</p>
            </div>

            <div className="ml-auto mr-6 flex space-x-4">
              <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold shadow hover:bg-blue-100 transition">
                Detailes
              </button>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold shadow hover:bg-blue-100 transition">
                Update Profile
              </button>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold shadow hover:bg-blue-100 transition">
                Saved Posts
              </button>
            </div>

          </div>
        {/* 1 div end */}

        {/* 2 user post stats */}

        {/* if there is no blog created then show a message */}
          <div className="mt-4 w-[90%]">
           
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  post
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Published
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats  
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions  
                </th>
              </tr>
            </thead>
            <tbody className="bg-white devide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  {/* Imgae div */}
                  <div>
                    <img 
                      src="C:\Users\gaura\Videos\Screenshots"
                      alt=""
                      className="h-full w-full object-cover"
                    /> 
                  </div>
                  <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                    Title
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-teal-100 text-teal-800">
                  TechBlog
                </span>
              </td>

              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                {Date.now()}
              </td>

              <td>
                <div className="flex space-x-4">
                  <span className="flex items-center">
                    <span className="mr-1">()</span> 53 
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">()</span> 20 
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">()</span> 2 
                  </span>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                {/* replace with Link tag */}
                  <span className="text-gray-500 hover:text-gray-700 p-1">
                    <Eye size={18}/>
                  </span>
                  <span className="text-gray-500 hover:text-gray-700 p-1">
                    <PenSquare size={18}/>
                  </span>
                  <button
                    // onClick={() => handleDeletePost(post.id)}
                    className="text-gray-500 hover:text-red-400 p-1">
                    <Trash2 size={18}/>
                  </button>
                </div>
              </td>

              </tr>  
            </tbody>
            </table>
          </div> 

        </div>
        {/* 2 div end */}

        <div className="mt-auto mr-auto  ml-12 mb-3 bottom-4 left-4">
          <button className="py-2 px-4 border text-custom-ash-900  rounded-lg">
            <LogOut size={20} className="hover:text-red-400"/>
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}
