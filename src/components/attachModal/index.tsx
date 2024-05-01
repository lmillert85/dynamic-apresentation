import { IoMdClose } from 'react-icons/io';
import * as S from './style';
import { useAttachModal } from '@dynamic/contexts/attachModal';
import { MdOutlineFileUpload } from 'react-icons/md';
import { useState } from 'react';
import { FaRegSave } from 'react-icons/fa';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';

import Brasilia300600 from '../../../public/assets/300x600/BG/Brasilia.png';
import Fortaleza300600 from '../../../public/assets/300x600/BG/Fortaleza.png';
import Fold300600 from '../../../public/assets/300x600/Celular/Fold.png';
import Galaxy300600 from '../../../public/assets/300x600/Celular/Galaxy.png';
import Iphone300600 from '../../../public/assets/300x600/Celular/Iphone.png';
import Motorola300600 from '../../../public/assets/300x600/Celular/Motorola.png';
import Isa_1_300600 from '../../../public/assets/300x600/Personagem/Isa_01.png';
import Isa_2_300600 from '../../../public/assets/300x600/Personagem/Isa_02.png';
import Isa_3_300600 from '../../../public/assets/300x600/Personagem/Isa_03.png';
import Mion_1_300600 from '../../../public/assets/300x600/Personagem/Mion_01.png';
import Mion_2_300600 from '../../../public/assets/300x600/Personagem/Mion_02.png';
import Mion_3_300600 from '../../../public/assets/300x600/Personagem/Mion_03.png';

import Brasilia400400 from '../../../public/assets/400x400/BG/Brasilia.png';
import Fortaleza400400 from '../../../public/assets/400x400/BG/Fortaleza.png';
import Fold400400 from '../../../public/assets/400x400/Celular/Fold.png';
import Galaxy400400 from '../../../public/assets/400x400/Celular/Galaxy.png';
import Iphone400400 from '../../../public/assets/400x400/Celular/Iphone.png';
import Motorola400400 from '../../../public/assets/400x400/Celular/Motorola.png';
import Isa_1_400400 from '../../../public/assets/400x400/Personagem/Isa_01.png';
import Isa_2_400400 from '../../../public/assets/400x400/Personagem/Isa_02.png';
import Isa_3_400400 from '../../../public/assets/400x400/Personagem/Isa_03.png';
import Mion_1_400400 from '../../../public/assets/400x400/Personagem/Mion_01.png';
import Mion_2_400400 from '../../../public/assets/400x400/Personagem/Mion_02.png';
import Mion_3_400400 from '../../../public/assets/400x400/Personagem/Mion_03.png';

import Brasilia_thumb from '../../../public/assets/300x600/BG/Brasilia_thumb.png';
import Fortaleza_thumb from '../../../public/assets/300x600/BG/Fortaleza_thumb.png';
import Fold_thumb from '../../../public/assets/300x600/Celular/Fold_thumb.png';
import Galaxy_thumb from '../../../public/assets/300x600/Celular/Galaxy_thumb.png';
import Iphone_thumb from '../../../public/assets/300x600/Celular/Iphone_thumb.png';
import Motorola_thumb from '../../../public/assets/300x600/Celular/Motorola_thumb.png';
import Isa_1__thumb from '../../../public/assets/300x600/Personagem/Isa_01_thumb.png';
import Isa_2__thumb from '../../../public/assets/300x600/Personagem/Isa_02_thumb.png';
import Isa_3__thumb from '../../../public/assets/300x600/Personagem/Isa_03_thumb.png';
import Mion_1__thumb from '../../../public/assets/300x600/Personagem/Mion_01_thumb.png';
import Mion_2__thumb from '../../../public/assets/300x600/Personagem/Mion_02_thumb.png';
import Mion_3__thumb from '../../../public/assets/300x600/Personagem/Mion_03_thumb.png';

import { useCampaign } from '@dynamic/contexts/campaign';
import { Iso } from '@mui/icons-material';
import { IUpdateFeed } from '@dynamic/services/interface';
import { PostChangeSheets } from '@dynamic/services/feedService';

const AttachModal = () => {
	const [file, setFile] = useState<File>();
	const { isOpen, setIsOpen, row, column } = useAttachModal();
	const spreadsheetData = useSpreadsheetData();
	const assetsThumb = [
		{src: Brasilia_thumb, fileName: "Brasilia.png"},
		{src: Fortaleza_thumb, fileName: "Fortaleza.png"}, 
		{src: Fold_thumb, fileName: "Fold.png"},
		{src: Galaxy_thumb, fileName: "Galaxy.png"},
		{src: Iphone_thumb, fileName: "Iphone.png"},
		{src: Motorola_thumb, fileName: "Motorola.png"},
		{src: Isa_1__thumb, fileName: "Isa_01.png"},
		{src: Isa_2__thumb, fileName: "Isa_02.png"},
		{src: Isa_3__thumb, fileName: "Isa_03.png"},
		{src: Mion_1__thumb, fileName: "Mion_01.png"},
		{src: Mion_2__thumb, fileName: "Mion_02.png"},
		{src: Mion_3__thumb, fileName: "Mion_03.png"},
	];
	
	const assets400400 = [
		Brasilia400400, 
		Fortaleza400400, 
		Fold400400,
		Galaxy400400,
		Iphone400400,
		Motorola400400,
		Isa_1_400400,
		Isa_2_400400,
		Isa_3_400400,
		Mion_1_400400,
		Mion_2_400400,
		Mion_3_400400
	];

	const assets300600 = [
		Brasilia300600, 
		Fortaleza300600, 
		Fold300600,
		Galaxy300600,
		Iphone300600,
		Motorola300600,
		Isa_1_300600,
		Isa_2_300600,
		Isa_3_300600,
		Mion_1_300600,
		Mion_2_300600,
		Mion_3_300600
	];
	
	const { activeCampaign, campaign, handleChangeCampaign, selectedFormat } = useCampaign();

	const handleChangeFile = (fileName: string, index: number): void => {
		fetch(assets300600[index].src)
		  .then(response => {
			if (!response.ok) {
			  throw new Error('Erro ao carregar a imagem');
			}
			return response.blob();
		  })
		  .then(blob => {
			const reader = new FileReader();
			reader.onload = () => {
				if (activeCampaign === null) return;
				var copyspreadsheetData = JSON.parse(JSON.stringify(spreadsheetData.spreadsheetData));
				const keys = Object.keys(copyspreadsheetData[0].elementos);
				const key = keys[column];
				const b64ImageResult = reader.result;
				copyspreadsheetData[row].elementos[key].value = `url('${b64ImageResult}') no-repeat`;
				console.log('copyspreadsheetData[row].elementos[key].value')
				console.log(copyspreadsheetData[row].elementos[key].value)
				copyspreadsheetData[row].elementos[key].imageName = fileName;
				spreadsheetData.setSpreadsheetData(copyspreadsheetData);
				console.log(key, key)
				var update: IUpdateFeed = {
					row: row,
					column: parseInt(key),
					value: b64ImageResult as string,
					imageName: fileName,
					uuidv: 'teste'
				};
				PostChangeSheets(update);
				setIsOpen(false);
			};
			reader.readAsDataURL(blob);
		  })
		  .catch(error => {
			console.error('Erro:', error);
		  });
	};

	return (
		<S.Root isOpen={isOpen} >
			<S.Container hasFile={false}>
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
						assetsThumb.map((item, index) => (
							<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '30px'}} onClick={() => handleChangeFile(item.fileName, index)}>
								<img src={item.src.src} style={{width: "60px", border: '1px solid black', padding: '20px'}}></img>
								<span style={{fontSize: '12px', marginLeft: '20px'}}>
									{ item.fileName }</span>
							</div>
						))
					}
				</div>
			</S.Container>
		</S.Root>
	);
};

export default AttachModal;

