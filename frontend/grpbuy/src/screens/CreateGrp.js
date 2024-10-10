import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav.js'

export default function CreateGrp() {

  const [grpData, setGrpData] = useState({
    name: '',
    categoryId: null,
    minCount: ''
  })
  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    let response = await fetch('http://127.0.0.1:4000/api/categories/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      }
    })
    let data = await response.json();
    if (data.success) {
      setCategories(data.data)
    }
  }

  const createGroup = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:4000/api/groups/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      },
      body: JSON.stringify(grpData)
    })
    const data = await response.json();
    console.log(data)
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
  }

  const onChangeHandler = (e) => {
    setGrpData({
      ...grpData, [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      window.location.href = '/'
    }
    getCategories()
  }, [])

  return (
    <div>
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

      <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
          <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div class="max-w-md mx-auto">
              <form onSubmit={createGroup}>
                <div class="flex items-center space-x-5">
                  <div class="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">GrpBuy</div>
                  <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
                    <h2 class="leading-relaxed">Create a Group</h2>
                    <p class="text-sm text-gray-500 font-normal leading-relaxed">Note: Only Admins can create groups</p>
                  </div>
                </div>
                <div class="divide-y divide-gray-200">
                  <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div class="flex flex-col">
                      <label class="leading-loose">Product Title</label>
                      <input type="text" name='name' onChange={onChangeHandler} class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Event title" />
                    </div>

                    <div class="flex flex-col">
                      <label class="leading-loose">Product Image</label>
                      <input type="file" name='image' onChange={onChangeHandler} class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Event title" />
                    </div>
                    <div class="flex flex-col">
                      <label class="leading-loose">Select Category</label>
                      <select name="categoryId" id="" onChange={onChangeHandler} class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option value={category._id}>{category.name}</option>
                        ))}
                      </select>
                    </div>

                    <div class="flex flex-col">
                      <label class="leading-loose">Minimum Product Count</label>
                      <input type="text" name='minCount' onChange={onChangeHandler} class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Min count..." />
                    </div>
                  </div>
                  <div class="pt-4 flex items-center space-x-4">
                    <button type="submit" class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Create</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
