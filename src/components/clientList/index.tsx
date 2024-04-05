'use client';

import { useEffect, useState } from 'react';
import * as S from './style';
import * as I from './interface';
import { FaArrowRight } from 'react-icons/fa';
import { useRouter, useParams } from 'next/navigation';
import { GetClients } from '@dynamic/services/feedService';
import { IClients } from '@dynamic/services/interface';

const ClientList: React.FC<I.RouteType> = ({ goto })  => {
	const [ clients, setClients ] = useState<Array<IClients>>();
	const router = useRouter();

	useEffect(() => {
        const fetchClients = async () => {
            try {
                const fetchedCampaigns = await GetClients('uuidv');
                setClients(fetchedCampaigns);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, []);

	return (
		<S.ClientListContainer>
			{clients?.map((client) => (
				<figure
					className="clientWrapper"
					onClick={() => router.push(`${goto}/${client.uuidv}`)}
					onKeyDown={() => null}
                    key={Math.random()}
				>
					<img src={client.logo} alt="client" />
					<figcaption>
						<p>{client.name}</p> <FaArrowRight />
					</figcaption>
				</figure>
			))}
		</S.ClientListContainer>
	);
};

export default ClientList;
