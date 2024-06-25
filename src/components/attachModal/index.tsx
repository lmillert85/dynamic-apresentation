import { IoMdClose } from 'react-icons/io';
import * as S from './style';
import { useAttachModal } from '@dynamic/contexts/attachModal';
import { MdOutlineFileUpload } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { FaRegSave } from 'react-icons/fa';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';;
import { useCampaign } from '@dynamic/contexts/campaign';
import { IAssets, IUpdateFeed } from '@dynamic/services/interface';
import { GetAssets, PostChangeSheets } from '@dynamic/services/feedService';

const AttachModal = () => {
	const [ listAssets, setListAssets ] = useState<Array<IAssets>>();
	const [file, setFile] = useState<File>();
	const { isOpen, setIsOpen, row, column } = useAttachModal();
	const spreadsheetData = useSpreadsheetData();
    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const fetchedAssets = await GetAssets(spreadsheetData.spreadsheetData[0].uuidv_campaign);
				console.log('fetchedAssets')
				console.log(fetchedAssets)
				setListAssets(fetchedAssets);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        };

        fetchAssets();
    }, []);

	
	const { activeCampaign, campaign, handleChangeCampaign, selectedFormat } = useCampaign();

	const handleChangeFile = async (fileName: string, index: number): Promise<void> => {
		if (activeCampaign === null) return;
		var copyspreadsheetData = JSON.parse(JSON.stringify(spreadsheetData.spreadsheetData));
		const keys = Object.keys(copyspreadsheetData[0].elementos);
		const key = keys[column];
		copyspreadsheetData[row].elementos[key].imageName = fileName;
		spreadsheetData.setSpreadsheetData(copyspreadsheetData);
		var update: IUpdateFeed = {
			row: row,
			column: parseInt(key),
			value: '',
			imageName: fileName,
			uuidv: copyspreadsheetData[0].uuidv_feed
		};
		await PostChangeSheets(update);
		setIsOpen(false);
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
					<span style={{height: '30px', marginLeft: '30px', fontSize: '14px', marginTop: '6px'}}>Meus Assets</span>
				</div>
				<div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
					{
						listAssets?.map((item, index) => (
							<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '30px'}} onClick={() => handleChangeFile(item.name, index)}>
								<img src={item.image} style={{width: "60px", border: '1px solid black', padding: '20px', background: item.name === 'Brasilia.png' || item.name === 'Fortaleza.png' ? 'black' : 'transparent'}}></img>
								<span style={{fontSize: '12px', marginLeft: '20px'}}>
									{ item.name }</span>
							</div>
						))
					}
				</div>
			</S.Container>
		</S.Root>
	);
};

export default AttachModal;

