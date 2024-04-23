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
      {/* TODO style form */}
      <form
        onSubmit={handleSubmit}
        method="POST"
        className='flex flex-col gap-3 w-1/2'>
        <h1>Create new user</h1>
        <div>
          <label>Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            required={true}
            value={formData.name}
            className="m-2  bg-slate-400 rounded" />
        </div>

        <div>
          <label>Email</label>
          <input
            id="email"
            name="email"
            type="text"
            onChange={handleChange}
            required={true}
            value={formData.email}
            className="m-2  bg-slate-400 rounded" />
        </div>

        <div>
          <label>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            required={true}
            value={formData.password}
            className="m-2  bg-slate-400 rounded" />
        </div>

        <div>
          <input
            type="submit"
            value="Create User"
            className="bg-blue-300 hover:bg-blue-100" />
        </div>
      </form>
      <p className="text-red-500">{errorMessage}</p>
    </>
  )
}

export default UserForm