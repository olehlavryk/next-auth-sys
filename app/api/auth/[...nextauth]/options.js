import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const options = {
  providers: [
    GithubProvider({
      profile(profile) {
        console.log("Profile Github:", profile)

        let userRole = 'GitHub User'
        if (profile?.email === 'oleh.lavrik@gmail.com') {
          userRole = 'admin'
        }

        const userProfile = {
          ...profile,
          role: userRole
        }

        console.log("User Profile:", userProfile)
        return userProfile

      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      profile(profile) {
        let userRole = 'Google User'

        return {
          ...profile,
          id: profile.sub,
          role: userRole
        }
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
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