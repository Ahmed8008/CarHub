import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

// Update the pool configuration with your PostgreSQL database details
const pool = new Pool({
  host: 'ep-frosty-fog-a5rnzfoq.us-east-2.aws.neon.tech',  // Replace with your Neon host
  user: 'registrationdbb_owner',  // Replace with your Neon username
  password: 'LmIdb7x1QayS',        // Replace with your Neon password
  database: 'registrationdbb',
  port: 5432,                     // Default port for PostgreSQL
  ssl: {
    rejectUnauthorized: false,   // Adjust this based on your SSL requirements
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { Name, Email, Password } = req.body;

    if (!Name || !Email || !Password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // Use PostgreSQL query syntax with $1, $2, etc.
      const result = await pool.query(
        'INSERT INTO registration (Name, Email, Password) VALUES ($1, $2, $3) RETURNING *',
        [Name, Email, Password]
      );

      res.status(200).json({ message: 'User registered successfully', result: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
