import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IDKitWidget } from '@worldcoin/idkit'

const IDKit = () => {
    const { t } = useTranslation();
    const appId = import.meta.env.APP_ID;
    const actionId = import.meta.env.ACTION_ID;
    const [verified, setVerified] = useState(false); // Define verified state

    const handleVerify = async (proof) => {
        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(proof),
            });

            if (!res.ok) {
                throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
            }

            // If verification is successful, update the verified state
            setVerified(true); // Set verified to true
        } catch (error) {
            console.error("Error during verification:", error);
            // Handle error (optional)
        }
    };

    const onSuccess = () => {
        // Redirect or perform any action after the modal is closed
        window.location.href = "/success"; // Example redirect
    };

    return (
        <>
            {!verified ? (
                <IDKitWidget
                    app_id={appId} // obtained from the Developer Portal
                    action={actionId} // this is your action name from the Developer Portal
                    handleVerify={handleVerify} // callback when the proof is received
                    onSuccess={onSuccess}
                    verification_level="device" // minimum verification level accepted, defaults to "orb"
                >
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
