// pages/api/auth.js

import { verifyCloudProof } from '@worldcoin/idkit'; // Import the verification function from IDKit

async function Auth(req, res) {
  if (req.method === 'POST') {
    const proof = req.body;

    try {
      // Verify the proof using the IDKit verification function
      const verificationResult = await verifyCloudProof(proof);

      if (verificationResult.success) {
        // If verification is successful, you can handle session creation or user authentication here
        // For example, you might want to create a session or a JWT token
        res.status(200).json({ message: 'Verification successful', verified: true });
      } else {
        // If verification fails, return an error
        res.status(401).json({ message: 'Verification failed', verified: false });
      }
    } catch (error) {
      console.error('Verification error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default Auth