"use client"
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const Member = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(
        '/api/auth/signin?callbackUrl=/ClientMember'
      )
    }
  })

  return (
    <>
      <div>ClientMember</div>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </>
  )
}

export default Member