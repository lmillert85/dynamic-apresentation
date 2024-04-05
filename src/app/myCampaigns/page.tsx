'use client';

import ClientList from '@dynamic/components/clientList';
import * as S from './style';
import { AiOutlineSearch } from 'react-icons/ai';
import { GetClients } from '@dynamic/services/feedService';
import { useRouter } from 'next/router';
const {
    isFallback,
} = useRouter();

const Page = async () => {    
    if (isFallback) {
        return <h1>Fallback</h1>;
    }
	return (
		<S.Container>
            <span>
			    <h1>My Campaigns</h1>

                <div>
                    <input type='text' placeholder='Buscar campanha' />
                    <AiOutlineSearch className='iconSearch' />
                </div>
            </span>

            <section>
			    <ClientList goto="myCampaigns"/>
            </section>
		</S.Container>
	);
};

export default Page;
