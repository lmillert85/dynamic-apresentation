import { FiEdit } from 'react-icons/fi';
import { MdOutlinePhotoLibrary } from 'react-icons/md';
import { BsStar, BsFileEarmarkZip } from 'react-icons/bs';
import { TbSquareChevronRightFilled } from 'react-icons/tb';
import { useLateralMenu } from './context/lateralMenuContext';
import { useRouter } from 'next/navigation';
import * as E from './context/enum';
import * as S from './style';
import vars from '@dynamic/styles/colors.style';
import { selectedRoute, setSelectedRoute } from '@dynamic/services/feedService';
import { useState } from 'react';
import { useDynamic } from '@dynamic/contexts/dynamic';

const LateralMenu = () => {
	const [selected, setSelected] = useState(selectedRoute());
	const { teste, setTeste } = useDynamic();
	const router = useRouter();
	const handleChangeRoute = (
		route: string,
		contextChange: E.contextTypes
	) => {
		setSelectedRoute(contextChange);
		setSelected(contextChange);
		router.push(route);
	};

	return (
		<S.LateralMenuContainer>
			<div>
				<TbSquareChevronRightFilled className="dynamicIcon" />{' '}
				<p>Dynamic ads</p>
			</div>

			<ul>
				<li
					style={{background: selectedRoute() === 'newCampaign' ? vars.colors.orange : '', color: selectedRoute() === 'newCampaign' ? 'white' : ''}}
					onClick={() => {
						setTeste(teste + 1);
						handleChangeRoute('/', E.contextTypes.NEW_CAMPAIGN)
						}
					}
					id={E.contextTypes.NEW_CAMPAIGN}
				>
					<FiEdit className="iconList" /> <p>Criar campanha</p>
				</li>
				<li
					style={{background: selectedRoute() === 'myCampaigns' ? vars.colors.orange : '', color: selectedRoute() === 'myCampaigns' ? 'white' : ''}}
					onClick={() =>
						handleChangeRoute(
							'/myCampaigns',
							E.contextTypes.MY_CAMPAIGNS
						)
					}
					id={E.contextTypes.MY_CAMPAIGNS}
				>
					<MdOutlinePhotoLibrary className="iconList" />{' '}
					<p>Minhas campanhas</p>
				</li>
				<li
					style={{background: selectedRoute() === 'myTemplates' ? vars.colors.orange : '', color: selectedRoute() === 'myTemplates' ? 'white' : ''}}
					onClick={() =>
						handleChangeRoute(
							'/myTemplates',
							E.contextTypes.MY_TEMPLATES
						)
					}
					id={E.contextTypes.MY_TEMPLATES}
				>
					<BsStar className="iconList" /> <p>Meus templates</p>
				</li>
				<li
					style={{background: selectedRoute() === 'assets' ? vars.colors.orange : '', color: selectedRoute() === 'assets' ? 'white' : ''}}
					onClick={() =>
						handleChangeRoute('/assets', E.contextTypes.ASSETS)
					}
					id={E.contextTypes.ASSETS}
				>
					<BsFileEarmarkZip className="iconList" /> <p>Assets</p>
				</li>
			</ul>
		</S.LateralMenuContainer>
	);
};

export default LateralMenu;
