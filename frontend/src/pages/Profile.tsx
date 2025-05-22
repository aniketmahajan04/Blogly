import { BookMarked, Eye, LogOut, PenSquare, Trash2 } from "lucide-react"
import { Button } from "../components/Button"
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Profile = () => {
  const { user, profile, isLoggedIn, loading, error, logout } = useAuthStore();
  const navigate = useNavigate();
  const [localLoading, setLocalLoading] = useState(true);

  useEffect( ()=> {
    if(!isLoggedIn){
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try{
        await profile();
      }catch(error){
        console.error("Error fetching user")
      } finally{
        setLocalLoading(false)
      }
    }

    fetchUser();
  }, [isLoggedIn, profile, navigate])

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

   if (localLoading || loading) return <div>Loading...</div>;
   if (error) return <div>Error: {error}</div>;
   if (!user) return <div>No user data found.</div>;


  return (
    <div>
      {/* Profile detailes div */}
      <div className="flex justify-center items-center h-screen w-full bg-custom-ash-300">
      {/* profile card div */}
        <div className="flex flex-col items-center w-[80%] h-[80%] rounded-2xl shadow-xl bg-white">
        
        {/* 1 user img and name div */}
          <div className="flex items-center p-2 w-[90%] mt-5 rounded-lg">
            <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center ml-4">
              <img 
                src={user.image ?? "https://unsplash.com/photos/frog-staring-intensely-with-detailed-eyes-CbAPNRuVyUk"} 
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
                />
            </div>
            <div className="ml-6 flex flex-col justify-center">
              <h3 className="font-bold text-xl text-custom-ash-900">
               {user.name}
              </h3>
              <span className="text-sm text-gray-800">{user.email}</span>
            </div>
            <div className="ml-12 text-center">
              <h4 className="font-semibold">
                Posts
              </h4>
              <p className="text-lg font-bold">30</p>
            </div>

            <div className="ml-auto mr-6 flex space-x-4">
              <Button 
                text="Detailes"
                variant="profile"
                onClick={() => alert("clicked")}
                >
              </Button>
              <Button 
                text="Update profile"
                variant="profile"
                onClick={() => alert("clicked")}
                >
              </Button>
              <Button 
              icon={<BookMarked />}
                variant="profile"
                onClick={() => alert("clicked")}
                >
              </Button>
              
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
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  post
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Published
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats  
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions  
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-center">
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

              <td className="px-6 text-center py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-teal-100 text-teal-800">
                  TechBlog
                </span>
              </td>

              <td className="px-6 py-2 whitespace-nowrap text-sm text-center text-gray-500">
                {Date.now()}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                <div className="flex justify-center space-x-4">
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
                <div className="flex justify-center space-x-2">
                {/* replace with Link tag */}
                  <span className="text-gray-500 hover:text-gray-700 p-1">
                    <Eye size={18}/>
                  </span>
                  <span className="text-gray-500 hover:text-gray-700 p-1">
                    <PenSquare size={18}/>
                  </span>
                  {/* <button */}
                  {/*   // onClick={() => handleDeletePost(post.id)} */}
                  {/*   className="text-gray-500 hover:text-red-400 p-1"> */}
                  {/*   <Trash2 size={18}/> */}
                  {/* </button> */}
                  <Button 
                    icon={ <Trash2 size={18}/>}
                    variant="trash"
                    onClick={() => alert("clicked")}
                  ></Button>
                </div>
              </td>

              </tr>  
            </tbody>
            </table>
          </div> 

        </div>
        {/* 2 div end */}

        <div className="mt-auto mr-auto  ml-12 mb-3 bottom-4 left-4">
          <Button
            onClick={handleLogout}
            variant="logout"
            icon={<LogOut size={20} className="hover:text-red-400"/>}
          >
          </Button>
        </div>
        </div>
      </div>
    </div>
  )
}
