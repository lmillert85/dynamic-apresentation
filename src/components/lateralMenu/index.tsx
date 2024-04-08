import { FiEdit } from 'react-icons/fi';
import { MdOutlinePhotoLibrary } from 'react-icons/md';
import { BsStar, BsFileEarmarkZip } from 'react-icons/bs';
import { TbSquareChevronRightFilled } from 'react-icons/tb';
import { useLateralMenu } from './context/lateralMenuContext';
import { useRouter } from 'next/navigation';
import * as E from './context/enum';
import * as S from './style';

const LateralMenu = () => {
	const { handleChangeSelectedRoute, selectedRoute } = useLateralMenu();
	const router = useRouter();

	const handleChangeRoute = (
		route: string,
		contextChange: E.contextTypes
	) => {
		handleChangeSelectedRoute(contextChange);
		router.push(route);
	};

	return (
		<S.LateralMenuContainer selected={selectedRoute}>
			<div>
				<TbSquareChevronRightFilled className="dynamicIcon" />{' '}
				<p>Dynamic ads</p>
			</div>

			<ul>
				<li
					style={{cursor: 'not-allowed'}}
					onClick={() =>
						handleChangeRoute('/', E.contextTypes.NEW_CAMPAIGN)
					}
					id={E.contextTypes.NEW_CAMPAIGN}
				>
					<FiEdit className="iconList" /> <p>Criar campanha</p>
				</li>
				<li
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
