import { connectToDB } from '/Users/garvjain/Downloads/eyereplace/utils/database.js';
import User from '/Users/garvjain/Downloads/eyereplace/models/user.js';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectToDB();

      const { token } = req.body;

      // Verify the token with Google
      const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`);
      const profile = await response.json();

      if (!profile.email) {
        return res.status(400).json({ error: 'Invalid token' });
      }

      // Check if user exists
      let user = await User.findOne({ email: profile.email });

      // If not, create a new user
      if (!user) {
        user = await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
          role: 'user' // Set a default role, or determine it based on your logic
        });
      }

      // Create a session (you might want to use a different method here)
      const session = {
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          image: user.image,
          role: user.role
        }
      };

      res.status(200).json({ session });
    } catch (error) {
      console.error('Error in Chrome extension authentication:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}