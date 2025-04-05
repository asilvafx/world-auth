import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit';
import worldid_icon from '../assets/worldcoin.svg';

const IDKit = () => {
    const { t } = useTranslation();
    const [verified, setVerified] = useState(false); // Define verified state
    const [userHash, setUserHash] = useState(null); // Define verified state

    const WLD_Action = process.env.WLD_ACTION || "auth"; // Action name
    const WLD_AppId = process.env.WLD_APP_ID || "app_22f503b7107497ff51011caa16433fd2"; // App ID from Developer Portal
    const WLD_VerificationLevel = process.env.WLD_VERIFICATION_LVL || "device"; // Verification level
    const WLD_ServerUrl = process.env.WLD_SERVER_URL || "https://world-auth.dreamhosters.com/"; // Server URL


    const handleVerify = async (proof) => {
        try {
            const modifiedProof = {
                ...proof,
                action: WLD_Action // action name you want to use
            };

            console.log(modifiedProof);

            // Call your API route to verify the proof
            const res = await fetch(WLD_ServerUrl, { // Update the URL to your backend server
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(modifiedProof),
            });    
            
            // Check if the response is successful
            if (!res.ok) {
                throw new Error('Verification failed.');
            }

            const response = await res.json();

            const nullifierHash = response.data.nullifier_hash; // Accessing nullifier_hash

            /* 
            // Call your API route to verify the proof using axios
            const res = await axios.post(fetchUrl, modifiedProof, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }); 

            // Check if the response is successful
            if (res.status !== 200) {
                throw new Error('Verification failed.');
            }

            const nullifierHash = res.data.data.nullifier_hash; // Accessing nullifier_hash

            */
    

            // If verification is successful, update the verified state
            setVerified(true);

            console.log('Nullifier Hash:', nullifierHash); // Log the nullifier_hash

            setUserHash(nullifierHash);

        } catch (error) {
            console.error('Error during verification:', error);
        }
    };


    const onSuccess = () => {
        // Redirect or perform any action after the modal is closed
        console.log('Login successfully!')
    };

    const onError = (error) => {
        console.error('Error during IDKit verification:', error); 
    };


    return (
        <>
            {!verified ? (
                <IDKitWidget
                    app_id={WLD_AppId} // obtained from the Developer Portal
                    action={WLD_Action} // this is your action name from the Developer Portal
                    false
                    verification_level={WLD_VerificationLevel}  // Use the verification level
                    handleVerify={handleVerify}
                    onSuccess={onSuccess}
                    onError={onError}
                >
                    {({ open }) => (
                        <button
                                className="px-4 py-2 rounded-lg"
                                onClick={open}>
                                    <img className="pointer-events-none w-auto h-5 filter invert" src={worldid_icon} width={30} height={30} alt="WorldID" />
                                    Verify with World ID
                        </button>
                    )}
                </IDKitWidget>
            ) : (
                <div className="flex flex-col">
                    <p>🎉 Successfully authenticated! </p>
                    <p>Hash: {userHash}</p>
                </div>
            )}
        </>
    );
};

export default IDKit;
