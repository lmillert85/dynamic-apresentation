import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import * as S from './style';
import LogoReanimate from '../../../public/logoreanimatenew.png';

const Header = () => {
	return (
		<S.HeaderContainer>
			<div id="control-header-buttons">
				<HomeIcon className="iconColorOrange" fontSize="large" />
				<LogoutIcon className="iconColorOrange" fontSize="large" />
			</div>

			<figure id="reanimate-header-logo">
				<img
					src={LogoReanimate.src}
					alt="Reanimate and logo"
					className="reanimate-image-logo"
				/>
				<figcaption className="iconColorOrange dynamic-title">Dynamic Ads</figcaption>
			</figure>

			<div id="profile-header-icon">
				<AccountCircleIcon
					className="iconColorOrange"
					fontSize="large"
				/>
			</div>
		</S.HeaderContainer>
	);
};

export default Header;
