"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const UserForm = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState("")


  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage("")

    const res = await fetch('/api/Users', {
      method: 'POST',
      body: JSON.stringify({ formData }),
      'content-type': 'application/json'
    })

    console.log(res)

    if (!res.ok) {
      const response = await res.json()
      setErrorMessage(response.message)
    } else {
      router.refresh()
      router.push('/')
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className='flex flex-col gap-3 items-center mt-16'>
        <h1>Create new user</h1>
        <div className='flex flex-col gap-1 w-1/3 p-0 m-0'>
          <label>Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            required
            value={formData.name}
            className="m-2 bg-slate-400 rounded py-1 mx-0" />
        </div>

        <div className='flex flex-col gap-1 w-1/3 p-0 m-0'>
          <label>Email</label>
          <input
            id="email"
            name="email"
            type="text"
            onChange={handleChange}
            required
            value={formData.email}
            className="m-2 bg-slate-400 rounded py-1 mx-0" />
        </div>

        <div className='flex flex-col gap-1 w-1/3 p-0 m-0'>
          <label>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            required
            value={formData.password}
            className="m-2 bg-slate-400 rounded py-1 mx-0" />
        </div>

        <div className='flex flex-col gap-1 w-1/3 p-0 m-0'>
          <input
            type="submit"
            value="Create User"
            className="bg-blue-300 hover:bg-blue-100 p-3 rounded" />
        </div>
      </form>
      <p className="text-red-500">{errorMessage}</p>
    </>
  )
}

export default UserForm