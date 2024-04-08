'use client';

import ClientList from '@dynamic/components/clientList';
import * as S from './style';
import { BsPlus } from 'react-icons/bs';

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
