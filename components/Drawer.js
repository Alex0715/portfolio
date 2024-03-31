import React from 'react'
import { XIcon } from '@heroicons/react/outline'
import Link from 'next/link'

const Drawer = () => {
  const drawerCloseHandler = () => {
    document
      .querySelector('.drawer')
      .classList.add('-translate-x-full', 'opacity-0')
    setTimeout(() => {
      document
        .querySelector('.drawer-container')
        .classList.add('-translate-x-full', 'opacity-0')
    }, 300)
  }

  return (
    <div className="drawer-container fixed inset-0 z-50 h-screen w-full -translate-x-full bg-black bg-opacity-20 opacity-0">
      <div className="drawer relative h-full w-4/5 min-w-[320px] -translate-x-full transform bg-[#16161a] py-24 opacity-0 duration-300">
        {/* Cross */}
        <div className="absolute top-6 right-5 p-1">
          <XIcon
            className="h-6 w-6 cursor-pointer text-white"
            onClick={drawerCloseHandler}
          />
        </div>

        {/* Drawer Nav */}
        <div className="mx-auto flex flex-col px-6">
          <div className="flex flex-col divide-y divide-slate-600 text-slate-800">
            <Link href="#section1">
              <a
                className="px-2 py-4 text-white hover:text-indigo-600"
                onClick={drawerCloseHandler}
              >
                Home
              </a>
            </Link>
            <Link href="#section2">
              <a
                className="px-2 py-4 text-white hover:text-indigo-600"
                onClick={drawerCloseHandler}
              >
                My Works
              </a>
            </Link>
            
            <a
              className="px-2 py-4 text-white hover:text-indigo-600"
              href="https://drive.google.com/file/d/1ACCFzk3_D-bx9ZqRTnxTSM_zS2yOjBLd/view?usp=sharing"
              onClick={drawerCloseHandler}
            >
              Resume
            </a>

            <a
              className="px-2 py-4 text-white hover:text-indigo-600"
              href="mailto:arjunbose.ar@gmail.com"
              onClick={drawerCloseHandler}
            >
              Hire Me
            </a>
          </div>
        </div>

        {/* Social */}
        <div className="absolute bottom-24 right-0 left-0 flex justify-center">
          <div className="flex">
            <a
              className="mx-2 px-1 py-1 text-sm font-medium text-slate-400 hover:text-slate-500"
              href="https://www.facebook.com/arjun.rokz.75/"
              rel="noopener noreferrer"
            >
              Facebook
            </a>

            <a
              className="mx-2 px-1 py-1 text-sm font-medium text-slate-400 hover:text-slate-500"
              href="https://www.instagram.com/alex.mercer_ar/"
              rel="noopener noreferrer"
            >
              Instagram
            </a>

            <a
              className="mx-2 px-1 py-1 text-sm font-medium text-slate-400 hover:text-slate-500"
              href="https://www.linkedin.com/in/chirantan-bose-0b211b223/"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Drawer
