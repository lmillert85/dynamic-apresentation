'use client';

import ClientList from '@dynamic/components/clientList';
import * as S from './style';
import { AiOutlineSearch } from 'react-icons/ai';

const Page = async () => {
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
