import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IDKitWidget } from '@worldcoin/idkit'

const IDKit = () => {
    const { t } = useTranslation();
    const [verified, setVerified] = useState(false); // Define verified state

    const verifyProof = async (proof) => {
        console.log('proof', proof);
        const response = await fetch(
            'https://developer.worldcoin.org/api/v1/verify/app_staging_129259332fd6f93d4fabaadcc5e4ff9d',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...proof, action: "test"}),
            }
        );
        if (response.ok) {
            const { account } = await response.json();
            return account;
        } else {
            const { code, detail } = await response.json();
            throw new Error(`Error Code ${code}: ${detail}`);
        }
    };

    const onSuccess = () => {
        // Redirect or perform any action after the modal is closed
        setVerified(true);
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
                    handleVerify={verifyProof}
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
