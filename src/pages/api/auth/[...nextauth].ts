import { ethers } from 'ethers';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type Web3Credentials = {
  address?: string;
};
const COOKIE_EXPIRE_TIME = 30 * 24 * 60 * 60; // 30 days

export default NextAuth({
  providers: [
    CredentialsProvider({
      authorize: async ({ address }: Web3Credentials = {}) => {
        if (!address) throw new Error('Missing address');
        if (!ethers.utils.isAddress(address))
          throw new Error('Invalid address');

        return { address };
      },
      type: 'credentials',
      credentials: {
        address: { label: 'address', type: 'text' },
      },
    }),
  ],
  callbacks: {
    session({ session, user = { address: '' }, token = { address: '' } }) {
      const address =
        user.address || token.address || (session.user as any)?.address;
      return {
        ...session,
        user: {
          ...session.user,
          address,
        },
      };
    },
    jwt({ token, user }) {
      return { address: user?.address, ...token };
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: COOKIE_EXPIRE_TIME,
  },
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
