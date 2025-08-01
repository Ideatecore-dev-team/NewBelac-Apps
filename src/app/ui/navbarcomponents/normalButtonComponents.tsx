'use client'

import { useAuth } from '@/app/contexts/AuthContext';
import { ConnectButton } from '@xellar/kit';
import { TextButton } from '../button';

export default function CustomButtonComponent() {

    return (
        <ConnectButton.Custom>
            {({ isConnected, openConnectModal}) => {
                if (isConnected) {
                    return (
                        <h1>
                            CONNECTED
                        </h1>
                    );
                }

                return (
                    <TextButton
                        onClick={openConnectModal}
                        label='CONNECT'
                        size='M'
                    />
                );
            }}
        </ConnectButton.Custom>
    );
}