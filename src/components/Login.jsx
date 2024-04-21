import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch, useSelector} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
    const isAuthenticated = useSelector((state) => state.auth.status); // Assuming you have a slice named 'auth'
    const navItemsForNewUser = [ 
      {
          name: "Signup",
          slug: "/signup",
          active: !isAuthenticated,
      },
      ]
    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }


  return (
    <div>
        <video autoPlay loop muted className='absolute w-[80vw] h-[100vh] top-0 left-[12%] object-cover' src="../orange-blue-ball.webm"></video>
        <header className='w-[100vw] py-8 px-0 fixed top-0 left-0'>
            <nav className='flex ml-0 w-[98vw]'>
                <ul className='flex ml-auto'>
                    {navItemsForNewUser.map((item) => 
                    item.active ? (
                    <li className='relative overflow-hidden flex h-11 transition-all duration-500 justify-center cursor-pointer align-middle px-6 border border-solid border-slate-200 after:content-[""] after:absolute after:bg-slate-200 after:rounded-[50%] after:transition-all after:ease-in duration-300 after:h-[100%] after:w-[100%]  after:left-0 after:bottom-[-100%] hover:after:bottom-0 hover:after:rounded-full  rounded-full text-lg font-semibold  mr-4 duration-200 text-slate-200 hover:text-slate-900' key={item.name}>
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
        <div className='z-2 relative flex mt-40 items-center justify-center w-full'>
        <div className={`mx-auto mt-8 w-full shadow-lg max-w-lg bg-[#ffffff72] backdrop-blur rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex w-[100%] justify-center">
                    <span className="inline-block">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
      
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
            <p className="mt-4 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        </form>
        </div>
        </div>
    </div>
  )
}

export default Login