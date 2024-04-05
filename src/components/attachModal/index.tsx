import { IoMdClose } from 'react-icons/io';
import * as S from './style';
import { useAttachModal } from '@dynamic/contexts/attachModal';
import { MdOutlineFileUpload } from 'react-icons/md';
import { useState } from 'react';
import { FaRegSave } from 'react-icons/fa';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';
import Headset  from '../../../public/assets_dynamic/300x600/thumb/Headset-Gamer-Brutal.png';
import CasaSegura  from '../../../public/assets_dynamic/300x600/thumb/Casa-Segura-Positivo.png';
import Watch1  from '../../../public/assets_dynamic/300x600/thumb/Watch4-Classic-LTE-46mm.png';
import Watch2  from '../../../public/assets_dynamic/300x600/thumb/Watch4-Classic-LTE-42mm.png';
import Watch3  from '../../../public/assets_dynamic/300x600/thumb/Watch4-Classic-BT-44mm.png';
import FoneOuvido  from '../../../public/assets_dynamic/300x600/thumb/Motorolo-Pulse-120.png';
import Buds2  from '../../../public/assets_dynamic/300x600/thumb/Samsung-Galaxy-Buds2.png';
import A52  from '../../../public/assets_dynamic/300x600/thumb/Samsung-Galaxy-A52s-5G.png';
import S21  from '../../../public/assets_dynamic/300x600/thumb/Samsung-Galaxy-S21-128GB.png';
import Edge  from '../../../public/assets_dynamic/300x600/thumb/motorola-edge-20.png';
import G60  from '../../../public/assets_dynamic/300x600/thumb/Moto-g60.png';

import HeadsetFull  from '../../../public/assets_dynamic/300x600/Headset-Gamer-Brutal.png';
import CasaSeguraFull  from '../../../public/assets_dynamic/300x600/Casa-Segura-Positivo.png';
import Watch1Full  from '../../../public/assets_dynamic/300x600/Watch4-Classic-LTE-46mm.png';
import Watch2Full  from '../../../public/assets_dynamic/300x600/Watch4-Classic-LTE-42mm.png';
import Watch3Full  from '../../../public/assets_dynamic/300x600/Watch4-Classic-BT-44mm.png';
import FoneOuvidoFull  from '../../../public/assets_dynamic/300x600/Motorolo-Pulse-120.png';
import Buds2Full  from '../../../public/assets_dynamic/300x600/Samsung-Galaxy-Buds2.png';
import A52Full  from '../../../public/assets_dynamic/300x600/Samsung-Galaxy-A52s-5G.png';
import S21Full  from '../../../public/assets_dynamic/300x600/Samsung-Galaxy-S21-128GB.png';
import EdgeFull  from '../../../public/assets_dynamic/300x600/motorola-edge-20.png';
import G60Full  from '../../../public/assets_dynamic/300x600/Moto-g60.png';
import { useCampaign } from '@dynamic/contexts/campaign';

const AttachModal = () => {
	const [file, setFile] = useState<File>();
	const { isOpen, setIsOpen, row, column } = useAttachModal();
	const spreadsheetData = useSpreadsheetData();
	const listaAssets = [ Headset, CasaSegura, Watch1, Watch2, Watch3, FoneOuvido, Buds2, A52, S21, Edge, G60 ];
	const assets = [ HeadsetFull, CasaSeguraFull, Watch1Full, Watch2Full, Watch3Full, FoneOuvidoFull, Buds2Full, A52Full, S21Full, EdgeFull, G60Full ];
	const { activeCampaign, campaign, handleChangeCampaign } = useCampaign();

	const handleChangeFile = (fileThumb: any, fileName: string, index: number): void => {
		fetch(assets[index].src)
		  .then(response => {
			if (!response.ok) {
			  throw new Error('Erro ao carregar a imagem');
			}
			return response.blob();
		  })
		  .then(blob => {
			console.log('01')
			const reader = new FileReader();
			reader.onload = () => {
				if (activeCampaign === null) return;
				// const clone = [...(locale as Array<any>)];				
				var copyspreadsheetData = JSON.parse(JSON.stringify(spreadsheetData.spreadsheetData));
				console.log('copyspreadsheetData')
				console.log(copyspreadsheetData)
				console.log('row')
				console.log(row)
				const keys = Object.keys(copyspreadsheetData[0].elementos);
				const key = keys[column];
				const b64ImageResult = reader.result;
				console.log('row')
				console.log(row)
				console.log('key')
				console.log(key)
				copyspreadsheetData[row].elementos[key].value = b64ImageResult;
				copyspreadsheetData[row].elementos[key].imageName = fileName;
				spreadsheetData.setSpreadsheetData(copyspreadsheetData);
				setIsOpen(false);
				// var copyCampaign = JSON.parse(JSON.stringify(campaign));
				// copyCampaign[activeCampaign].creative[row][key].value = b64ImageResult;
				// copyCampaign[activeCampaign].creative[row][key].imageName = fileName;
				// spreadsheetData.values[row][key].value = b64ImageResult;
				// spreadsheetData.values[row][key].imageName = fileName;
				// spreadsheetData.handleChangeSpreadsheetData([...spreadsheetData.values]);
				// handleChangeCampaign(copyCampaign);
				// setLocale([...spreadsheetData.values]);
				// setIsOpen(false);
			};
			reader.readAsDataURL(blob);
		  })
		  .catch(error => {
			console.error('Erro:', error);
		  });
	};

	return (
		<S.Container isOpen={isOpen} hasFile={false}>
			<div
				onClick={() => setIsOpen(false)}
				style={{
					width: '15px', height: '20px', padding: 0, fontWeight: 'bold', cursor: 'pointer',
					position: 'absolute', right: '10px', top: '5px'}}>X</div>
			<div className='container-asset'>
				<span style={{height: '30px', marginLeft: '30px', fontSize: '14px', marginTop: '6px'}}>Meus Assets > VIVO > 300x600</span>
			</div>
			<div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
				{
					listaAssets.map((item, index) => (
						<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '30px'}} onClick={() => handleChangeFile(item, item.src.replaceAll('/_next/static/media/', ''), index)}>
							<img src={item.src} style={{width: "60px", border: '1px solid black', padding: '20px'}}></img>
							<span style={{fontSize: '12px', marginLeft: '20px'}}>
								{
								item.src.replaceAll('/_next/static/media/', '').length > 15 ?
								 item.src.replaceAll('/_next/static/media/', '').substring(0, 15) + "....png" 
								 : item.src.replaceAll('/_next/static/media/', '')
							}</span>
						</div>
					))
				}
			</div>
		</S.Container>
	);
};

export default AttachModal;

