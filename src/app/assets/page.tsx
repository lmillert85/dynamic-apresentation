'use client';

import ClientList from '@dynamic/components/clientList';
import * as S from './style';
import { BsPlus } from 'react-icons/bs';
import { useClientData } from '@dynamic/contexts/client';
import { useEffect } from 'react';
import { ListClients } from '@dynamic/services/feedService';
import { useParams } from 'next/navigation';

const Assets = () => {
	return (
		<S.Container>
            <div className='title'>
                <h1>Meus Assets</h1>

                <button>
                    Novo cliente <BsPlus className='iconPlus' />
                </button>
            </div>
			<ClientList goto='/assets' />
		</S.Container>
	);
};

export default Assets;
