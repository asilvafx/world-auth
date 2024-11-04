import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IDKitWidget } from '@worldcoin/idkit'

const IDKit = () => {
    const { t } = useTranslation();
    const [verified, setVerified] = useState(false); // Define verified state

    const handleVerify = async (proof) => {
        try {
            // Call your API route to verify the proof
            const res = await fetch('https://world-auth.dreamhosters.com/server.php', { // Update the URL to your backend server
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(proof),
            });

            if (!res.ok) {
                throw new Error('Verification failed.');
            }

            const data = await res.json();
            // If verification is successful, update the verified state
            if (data.verified) {
                setVerified(true);
                console.log('Successfully authenticated!');
            }
        } catch (error) {
            console.error('Error during verification:', error);
        }
    };


    const onSuccess = () => {
        // Redirect or perform any action after the modal is closed
        console.log('Login successfully!')
    };

    return (
        <>
            {!verified ? (
                <IDKitWidget
                    app_id="app_22f503b7107497ff51011caa16433fd2" // obtained from the Developer Portal
                    action="auth" // this is your action name from the Developer Portal
                    false
                    verification_level="device"
                    handleVerify={handleVerify}
                    onSuccess={onSuccess}>
                    {({ open }) =>
                        <button
                                className="px-4 py-2 rounded-lg"
                                onClick={open}>Verify with World ID
                        </button>
                    }
                </IDKitWidget>
            ) : (
                <p>🎉 Successfully authenticated!</p>
            )}
        </>
    );
};

export default IDKit;
