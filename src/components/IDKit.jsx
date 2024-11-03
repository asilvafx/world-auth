import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IDKitWidget } from '@worldcoin/idkit'

const IDKit = () => {
    const { t } = useTranslation();
    const appId = process.env.APP_ID;
    const actionId = process.env.ACTION_ID;
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
            console.log(res);
            
        } catch (error) {
            console.error("Error during verification:", error);
            // Handle error (optional)
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
                    app_id="app_7c54dd9d0c581377f255db271d4773b6" // obtained from the Developer Portal
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
