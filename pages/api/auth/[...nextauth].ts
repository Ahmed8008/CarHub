import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Pool } from 'pg';

// Create a new PostgreSQL client
const pool = new Pool({
  host: 'ep-frosty-fog-a5rnzfoq.us-east-2.aws.neon.tech',
  user: 'registrationdbb_owner',
  password: 'LmIdb7x1QayS',
  database: 'registrationdbb',
  port: 5432,  // Default port for PostgreSQL
  ssl: {
    rejectUnauthorized: false,  // Depending on your setup, you might need this for SSL connections
  },
});

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };

        if (!email || !password) {
          throw new Error('Email and password are required');
        }

        try {
          // Query using PostgreSQL
          const { rows } = await pool.query(
            'SELECT * FROM registration WHERE email = $1 AND password = $2',
            [email, password]
          );

          if (rows.length === 0) {
            throw new Error('Invalid credentials');
          }

          const user = rows[0];
          return { id: user.user_id, name: user.name, email: user.email };
        } catch (error) {
          console.error(error);
          throw new Error('Server error');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
});
