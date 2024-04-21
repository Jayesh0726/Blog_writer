import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className='w-[100vw] py-4 px-1 relative top-0 left-0 shadow bg-neutral-900'>
      <Container>
        <nav className='flex ml-0 w-[98vw]'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li className='relative overflow-hidden flex h-11 cursor-pointer border border-solid border-slate-200 transition-all duration-500 justify-center align-middle px-6 after:content-[""] after:absolute after:bg-slate-200 after:rounded-[50%] after:transition-all after:ease-in duration-300 after:h-[100%] after:w-[100%]  after:left-0 after:bottom-[-100%] hover:after:bottom-0 hover:after:rounded-full  rounded-full text-lg font-semibold  mr-4 duration-200 text-slate-200 hover:text-slate-900' key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='relative z-10'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li className='relative overflow-hidden flex h-11 cursor-pointer border border-solid border-slate-200 transition-all duration-500 justify-center align-middle px-6 after:content-[""] after:absolute after:bg-slate-200 after:rounded-[50%] after:transition-all after:ease-in duration-300 after:h-[100%] after:w-[100%]  after:left-0 after:bottom-[-100%] hover:after:bottom-0 hover:after:rounded-full  rounded-full text-lg font-semibold  mr-4 duration-200 text-slate-200 hover:text-slate-900'>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header