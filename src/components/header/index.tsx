import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import * as S from './style';
import LogoReanimate from '../../../public/logoreanimatenew.png';
import logoartmaker4 from '../../../public/logoartmaker4.png'
import { Divider } from '@mui/material';
import LogoHavas from '../../../public/havas.svg';

const Header = () => {
	return (
		<S.HeaderContainer>
			{/* <div id="control-header-buttons">
				<HomeIcon className="iconColorOrange" fontSize="large" />
				<LogoutIcon className="iconColorOrange" fontSize="large" />
			</div> */}
			<img src={LogoHavas.src} alt="logoartmaker4" style={{marginRight: '15px', width: '100px'}}/>

			<Divider style={{width: '28px', margin: '0 0 0 0', transform: 'rotate(90deg)'}}/>
			{/* <figure id="reanimate-header-logo"> */}
				{/* <img
					src={LogoReanimate.src}
					alt="Reanimate and logo"
					className="reanimate-image-logo"
				/> */}
				<figcaption className="iconColorOrange dynamic-title">Dynamic Ads</figcaption>
			{/* </figure> */}

			{/* <div id="profile-header-icon">
				<AccountCircleIcon
					className="iconColorOrange"
					fontSize="large"
				/>
			</div> */}
		</S.HeaderContainer>
	);
};

export default Header;


// import HomeIcon from '@mui/icons-material/Home';
// import LogoutIcon from '@mui/icons-material/Logout';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import * as S from './style';
// import LogoReanimate from '../../../public/logoreanimatenew.png';

// const Header = () => {
// 	return (
// 		<S.HeaderContainer>
// 			<div id="control-header-buttons">
// 				<HomeIcon className="iconColorOrange" fontSize="large" />
// 				<LogoutIcon className="iconColorOrange" fontSize="large" />
// 			</div>

// 			<figure id="reanimate-header-logo">
// 				<img
// 					src={LogoReanimate.src}
// 					alt="Reanimate and logo"
// 					className="reanimate-image-logo"
// 				/>
// 				<figcaption className="iconColorOrange dynamic-title">Dynamic Ads</figcaption>
// 			</figure>

// 			<div id="profile-header-icon">
// 				<AccountCircleIcon
// 					className="iconColorOrange"
// 					fontSize="large"
// 				/>
// 			</div>
// 		</S.HeaderContainer>
// 	);
// };

// export default Header;


