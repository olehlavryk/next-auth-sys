import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import User from '@/app/models/User'
import { adminsList, roles } from '@/app/constants'

export const options = {
  providers: [
    GithubProvider({
      profile(profile) {
        console.log("Profile Github:", profile)

        let userRole = roles.USER
        if (adminsList.includes(profile?.email)) {
          userRole = roles.ADMIN
        }

        const userProfile = {
          ...profile,
          role: userRole
        }
        return userProfile

      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      profile(profile) {
        let userRole = roles.USER

        if (adminsList.includes(profile?.email)) {
          userRole = roles.ADMIN
        }

        return {
          ...profile,
          id: profile.sub,
          role: userRole
        }
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password"
        }
      },
      async authorize(credentials) {
        try {
          const foundUser = await User.findOne({ email: credentials.email })
            .lean()
            .exec()

          if (foundUser) {
            console.log('User Exists')
            const match = await bcrypt.compare(credentials.password, foundUser.password)

            if (match) {
              delete foundUser.password

              foundUser["role"] = roles.GUEST

              if (adminsList.includes(foundUser?.email)) {
                foundUser["role"] = roles.ADMIN
              }

              return foundUser
            }
          }
        } catch (error) {
          console.log(error)
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user?.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token?.role
      }
      return session
    }
  }
}