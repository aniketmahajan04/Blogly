

export const Posts = () => {
    return(
        <div className="container bg-red-200 h-screen w-full flex flex-col justify-center items-center">
            <div >
                {Posts.map((post) => {

                    return (
                        <div key={post.id} className="bg-white shadow-md rouded-lg p-4 m-2 flex justify-center items-center">
                            <div className="bg-yellow-400">{post.image}</div>
                            <div className="bg-yellow-400">
                                <h2 className="text-xl font-bold">{post.title}</h2>
                                <p className="text-gray-700">{post.content}</p>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}


