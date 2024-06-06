'use client';

import { useEffect, useState } from 'react';
import * as S from './style';
import Breadcrumb from '@dynamic/components/breadcrumb';
import { MdUpload } from 'react-icons/md';
import { BsFillGridFill, BsFillImageFill } from 'react-icons/bs';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { SiGooglesheets } from 'react-icons/si';
import { useParams } from 'next/navigation';
import { GetAssets, GetAssetsByClient, GetClients } from '@dynamic/services/feedService';
import { IAssets } from '@dynamic/services/interface';

const Driver = () => {	
    const params = useParams();
    const uuidv_client = params.client;	
    const client = GetClients(uuidv_client.toString());
	const [isListView, setIsListView] = useState(true);
	const [items, setItems] = useState<Array<IAssets>>();
	
	useEffect(() => {
        const fetchAssets = async () => {
            try {
                const fetchedAssets = await GetAssetsByClient(client.uuidv);
				setItems(fetchedAssets);
            } catch (error) {
                console.error('Error fetching assets:', error);
            }
        };

        fetchAssets();
    }, []);

	const logoFromType = (type: 'image' | 'sheet') => {
		return type === 'image' ? (
			<BsFillImageFill className="typeIcon" />
		) : (
			<SiGooglesheets className="typeIcon" />
		);
	};

	const getSize = (b64: string) => {
		var base64WithoutHeader = b64.replace(/^data:image\/[a-z]+;base64,/, '');
		var decodedBytes = atob(base64WithoutHeader);
		return decodedBytes.length;
	}

	const renderItemsView = () => {
		if (isListView) {
			return (
				<section className="tableContainer">
					<table>
						<thead>
							<tr>
								<th>Nome do arquivo</th>
								<th>Tipo</th>
								<th>Atualizado</th>
								<th>Tamanho</th>
							</tr>
						</thead>
						<tbody>
							{items?.map((item) => (
								<tr key={item.id}>
									<td className="imgTableData" >
										<div style={{width: '130px', display: 'flex', justifyContent: 'center'}}>
											<img
												src={item.image}
												alt="img from api"
												style={{
													zIndex: 999,
													marginRight: '30px',
													maxWidth: '100px',
													maxHeight: '100px',
													backgroundColor: item.name === 'Brasilia.png' || item.name === 'Fortaleza.png' ? 'black' : 'transparent'
												}}
											/>
										</div>
										{item.name}
									</td>
									<td>{logoFromType(item.type as any)}</td>
									<td>{item.updatedAt}</td>
									<td>{item.size}</td>
								</tr>
							))}
						</tbody>
					</table>

					<aside>
						<h3>Detalhes</h3>

						<ul>
							<li>
								<span>Proprietario: </span> Renimate Demo
							</li>
							<li>
								<span>Proprietario da empresa: </span> {client.name}
							</li>
							<li>
								<span>Criado: </span> 01/05/2024
							</li>
							<li>
								<span>Modificado: </span> 01/05/2024
							</li>
							<li>
								<span>Tamanho: </span> 100kb
							</li>
						</ul>
					</aside>
				</section>
			);
		}

		return (
			<section className="gridView">
				{items?.map((item) => (
					<figure key={item.id}>
						<img src={item.image} alt="img from api" />
						<figcaption>
							<p>
                                {item.name}
                                <br />
                                {item.size}
                            </p>
							{logoFromType(item.type as any)}
						</figcaption>
					</figure>
				))}
			</section>
		);
	};

	return (
		<S.Container>
			<section className="header">
				<h1>Meus assets</h1>

				<div>
					<p>Filtrar por </p>
					<select>
						<option value="">Todas</option>
						<option value="">Imagens</option>
						<option value="">Planilha</option>
					</select>

					<button type="button">
						Upload <MdUpload />
					</button>
				</div>
			</section>

			<div className="breadcrumbContainer">
				<span>
					<Breadcrumb
						goto={['/assets', '/assets/' + client.name]}
						paths={['Meus assets', client.name, 'Driver']}
					/>
				</span>

				<div className="controls">
					<div onClick={() => setIsListView(false)}>
						<BsFillGridFill />
					</div>
					<div onClick={() => setIsListView(true)}>
						<AiOutlineUnorderedList />
					</div>
				</div>
			</div>

			<section>{renderItemsView()}</section>
		</S.Container>
	);
};

export default Driver;
