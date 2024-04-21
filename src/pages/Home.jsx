import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom'
import {Container, PostCard} from '../components'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Home() {
    const [posts, setPosts] = useState([])
    const isAuthenticated = useSelector((state) => state.auth.status); // Assuming you have a slice named 'auth'
   const navigate = useNavigate()

  function skeletonEffect(){
  return(
    <div className="shadow rounded-md p-4 w-[18vw]">
    <div className="animate-pulse flex flex-col space-x-4">
    <div className="rounded-xl bg-neutral-800 h-96 w-full"></div>
    <div className="flex-1 space-y-6 py-1">
        <div className="h-4 bg-neutral-800 mt-7 w-[75%] rounded-xl"></div>  
    </div>
    </div>
    </div>
  )
  }
   const navItemsForNewUser = [ 
    {
      name: "Login",
      slug: "/login",
      active: !isAuthenticated,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !isAuthenticated,
  },
  ]
    useEffect(() => {
        if (!isAuthenticated) {
            // You can redirect to the login page or display a message here
            return;
        }
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [isAuthenticated])
    if (!isAuthenticated) {
        return (
            <div className="w-[100vw] overflow-hidden mt-12 py-8 text-center">
                
                <Container>
                <video autoPlay loop muted className='absolute w-[100vw] h-[100vh] top-0 left-0 object-cover' src="../BlogWriteBgVideo.mp4"></video>
                    <div className="relative flex flex-wrap w-[100vw] content-center items-center">
                    <header className='w-[100vw] py-8 px-0 fixed top-0 left-0'>
                    <nav className='flex ml-0 w-[98vw]'>
                    <ul className='flex ml-auto'>
                    {navItemsForNewUser.map((item) => 
                    item.active ? (
                    <li className='relative overflow-hidden flex border border-solid cursor-pointer border-slate-200 h-11 transition-all duration-500 justify-center align-middle px-6 after:content-[""] after:absolute after:bg-slate-200 after:rounded-[50%] after:transition-all after:ease-in duration-300 after:h-[100%] after:w-[100%]  after:left-0 after:bottom-[-100%] hover:after:bottom-0 hover:after:rounded-full  rounded-full text-lg font-semibold  mr-4 duration-200 text-slate-200 hover:text-slate-900' key={item.name}>
                    <button
                    onClick={() => navigate(item.slug)}
                    className='relative z-10'
                    >{item.name}</button>
                    </li>
                    ) : null
                    )}
                    </ul> 
                    </nav>
                    </header>
                        <div className="mt-[25vh] flex flex-col pl-12 text-9xl font-bold text-gray-200 w-full flex justify-start">
                            <p className='flex'>Share your </p>
                            <p className='flex'>thoughts with</p>
                            <p className='flex'>world.</p>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-[100vw] px-8 text-center">
                <Container>
                    <div className="flex flex-wrap w-[98vw] gap-4 columns-6 p-[1vh] content-center items-center">
                    {Array.from({ length: 24 }).map((_, index) => (
                        <div key={index}>
                            {skeletonEffect()}
                        </div>
                    ))}
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-[100vw] px-8 text-center'>
            <Container>
                <div className='flex flex-wrap w-[98vw] gap-4 columns-6 p-[2vh]'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-[18vw]'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home