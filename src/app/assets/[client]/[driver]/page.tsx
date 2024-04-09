'use client';

import { useState } from 'react';
import * as S from './style';
import Breadcrumb from '@dynamic/components/breadcrumb';
import { MdUpload } from 'react-icons/md';
import { BsFillGridFill, BsFillImageFill } from 'react-icons/bs';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { SiGooglesheets } from 'react-icons/si';
import Headset  from '../../../../../public/assets_dynamic/300x600/Headset-Gamer-Brutal.png';
import CasaSegura  from '../../../../../public/assets_dynamic/300x600/Casa-Segura-Positivo.png';
import Watch1  from '../../../../../public/assets_dynamic/300x600/Watch4-Classic-LTE-46mm.png';
import Watch2  from '../../../../../public/assets_dynamic/300x600/Watch4-Classic-LTE-42mm.png';
import Watch3  from '../../../../../public/assets_dynamic/300x600/Watch4-Classic-BT-44mm.png';
import FoneOuvido  from '../../../../../public/assets_dynamic/300x600/Motorolo-Pulse-120.png';
import Buds2  from '../../../../../public/assets_dynamic/300x600/Samsung-Galaxy-Buds2.png';
import A52  from '../../../../../public/assets_dynamic/300x600/Samsung-Galaxy-A52s-5G.png';
import S21  from '../../../../../public/assets_dynamic/300x600/Samsung-Galaxy-S21-128GB.png';
import Edge  from '../../../../../public/assets_dynamic/300x600/motorola-edge-20.png';
import G60  from '../../../../../public/assets_dynamic/300x600/Moto-g60.png';

const Driver = () => {
	const [isListView, setIsListView] = useState(true);
	const [items, setItems] = useState([
		{
			id: 11,
			name: 'Headset.png',
			image: Headset.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '34.56kb'
		},
		{
			id: 10,
			name: 'CasaSegura.png',
			image: CasaSegura.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '25.56kb'
		},
		{
			id: 9,
			name: 'Watch1.png',
			image: Watch1.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '29.56kb'
		},
		{
			id: 8,
			name: 'Watch2.png',
			image: Watch2.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '29.56kb'
		},
		{
			id: 7,
			name: 'Watch3.png',
			image: Watch3.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '30.56kb'
		},
		{
			id: 6,
			name: 'FoneOuvido.png',
			image: FoneOuvido.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '31.56kb'
		},
		{
			id: 5,
			name: 'Buds2.png',
			image: Buds2.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '44.56kb'
		},
		{
			id: 4,
			name: 'A52.png',
			image: A52.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '44.56kb'
		},
		{
			id: 3,
			name: 'S21.png',
			image: S21.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '38.56kb'
		},
		{
			id: 2,
			name: 'Edge.png',
			image: Edge.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '33.56kb'
		},
		{
			id: 1,
			name: 'G60.png',
			image: G60.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '38.56kb'
		},
	]);

	const logoFromType = (type: 'image' | 'sheet') => {
		return type === 'image' ? (
			<BsFillImageFill className="typeIcon" />
		) : (
			<SiGooglesheets className="typeIcon" />
		);
	};

	

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
							{items.map((item) => (
								<tr key={item.id}>
									<td className="imgTableData">
										<img
											src={item.image}
											alt="img from api"
										/>{' '}
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
								<span>Proprietario: </span> Gustavo
							</li>
							<li>
								<span>Proprietario da empreasa: </span> Vivo
							</li>
							<li>
								<span>Criado: </span> 07/11/2023
							</li>
							<li>
								<span>Modificado: </span> {Date.now()}
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
				{items.map((item) => (
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
						goto={['/assets', '/assets/vivo']}
						paths={['Meus assets', 'Vivo', 'Driver']}
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
