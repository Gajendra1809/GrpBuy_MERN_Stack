import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import { Link } from 'react-router-dom'

export default function Register() {

  const [userData, setUserData] = useState({
    name: '', email: '', password: '', role: 'buyer'
  })

  const registerUser = async (e) => {
    e.preventDefault()
    // console.log("registering user")
    // console.log(userData)
    let response = await fetch('http://127.0.0.1:4000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    let data = await response.json()
    if (data.success) {
      document.getElementById('alert-1').classList.remove('hidden')
      document.getElementById('messageS').innerHTML = data.message
      setTimeout(() => {
        document.getElementById('alert-1').classList.add('hidden')
      }, 3000)
    } else {
      document.getElementById('alert-2').classList.remove('hidden')
      document.getElementById('messageE').innerHTML = data.error
      setTimeout(() => {
        document.getElementById('alert-2').classList.add('hidden')
      }, 3000)
    }
    console.log(data)
  }

  const onChangeHandler = (e) => {
    setUserData({
      ...userData, [e.target.name]: e.target.value
    })
  }
  return (
    <div className="bg-gray-100 h-screen">
      <div className="sticky top-0">
        <Nav />
      </div>

      {/* Alert Messages */}

      <div class="max-w-lg fixed top-5 right-5 z-50 mt-20">
        <div class="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700 hidden" role="alert" id='alert-2'>
          <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
          <div>
            <span class="font-medium" id='messageE'>Danger alert!</span>
          </div>
        </div>
        <div class="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700 hidden" role="alert" id='alert-1'>
          <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
          <div>
            <span class="font-medium" id='messageS'>Success alert!</span>
          </div>
        </div>
      </div>

      <div>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link
              rel="stylesheet"
              href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
              integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
              crossorigin="anonymous"
            />
          </head>
          <body className='bg-grey-100'>
            <div
              class="flex flex-col items-center justify-center"
            >
              <div
                class="
          flex flex-col
          bg-white
          shadow-md
          lg:px-10
          py-8
          px-8
          rounded-2xl
          w-50
          max-w-md
          my-20
        "
              >
                <div class="font-medium self-center text-xl sm:text-3xl text-gray-800">
                  Join us Now
                </div>
                <div class="mt-4 self-center text-xl sm:text-sm text-gray-800">
                  Enter your credentials to get access account
                </div>

                <div class="mt-10">
                  <form onSubmit={registerUser}>
                    <div class="flex flex-col mb-5">
                      <label
                        for="name"
                        class="mb-1 text-xs tracking-wide text-gray-600"
                      >Name:</label
                      >
                      <div class="relative">
                        <div
                          class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                        >
                          <i class="fas fa-user text-blue-500"></i>
                        </div>

                        <input
                          id="name"
                          type="name"
                          name="name"
                          value={userData.name}
                          onChange={onChangeHandler}
                          required
                          class="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>
                    <div class="flex flex-col mb-5">
                      <label
                        for="email"
                        class="mb-1 text-xs tracking-wide text-gray-600"
                      >E-Mail Address:</label
                      >
                      <div class="relative">
                        <div
                          class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                        >
                          <i class="fas fa-at text-blue-500"></i>
                        </div>

                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={onChangeHandler}
                          required
                          class="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    <div class="flex flex-col mb-6">
                      <label
                        for="password"
                        class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                      >Password:</label
                      >
                      <div class="relative">
                        <div
                          class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                        >
                          <span>
                            <i class="fas fa-lock text-blue-500"></i>
                          </span>
                        </div>

                        <input
                          id="password"
                          type="password"
                          name="password"
                          value={userData.password}
                          onChange={onChangeHandler}
                          required
                          class="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                          placeholder="Enter your password"
                        />
                      </div>
                    </div>

                    <div class="flex flex-col mb-6">
                      <label
                        for="role"
                        class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                      >Select Role:</label
                      >
                      <div class="relative">
                        <div
                          class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                        >
                        </div>

                        <select className="select" name='role' onChange={onChangeHandler}>
                          <option disabled selected>Pick one</option>
                          <option value={'buyer'}>Buyer</option>
                          <option value={'bidder'}>Bidder</option>
                        </select>
                      </div>
                    </div>

                    <div class="flex w-full">
                      <button
                        type="submit"
                        class="
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-blue-500
                  hover:bg-blue-600
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                "
                      >
                        <span class="mr-2 uppercase">Sign Up</span>
                        <span>
                          <svg
                            class="h-6 w-6"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="flex justify-center items-center mt-6">
                <a
                  href="#"
                  target="_blank"
                  class="
            inline-flex
            items-center
            text-gray-700
            font-medium
            text-xs text-center
          "
                >
                  <span class="ml-2"
                  >You have an account?
                    <Link
                      to="/"
                      class="text-xs ml-2 text-blue-500 font-semibold"
                    >Login here</Link
                    ></span
                  >
                </a>
              </div>
            </div>
          </body>
        </html>
      </div>
    </div>
  )
}
