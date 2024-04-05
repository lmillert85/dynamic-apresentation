import { usePreviewEditModalContext } from '@dynamic/contexts/previewEditModal';
import * as S from './style';
import { MdClose } from 'react-icons/md';
import { useEffect, useState } from 'react';
import {
useLocaleSyncTemplateData,
useSetLocaleSyncTemplateData
} from '@dynamic/hooks/localStorage';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import AttachModal from '../attachModal';
import { useAttachModal } from '@dynamic/contexts/attachModal';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';
import { useCampaign } from '@dynamic/contexts/campaign';

const PreviewEditModal = () => {
	const [columns, setColumns] = useState<Array<string>>([]);
	const [values, setValues] = useState<Array<any>>([]);
	const [openEdit, setOpenEdit] = useState<string | null>(null);
	const previewContext = usePreviewEditModalContext();
	const spreadsheetData = useSpreadsheetData();
	const setLocale = useSetLocaleSyncTemplateData;
	const locale = useLocaleSyncTemplateData();
	const { column, isOpen, setIsOpen, setColumn, row } = useAttachModal();
	const { activeCampaign, campaign, handleChangeCampaign } = useCampaign();
	
	useEffect(() => {
		if (previewContext.isOpen) {
			const object = locale[previewContext.index];
			const keys = object.map((item) => item.id);
			const valuesFromObject = object.map((item) =>
				item.tipo === 'b64' ? item.imageName : item.value
			);
			setColumns(keys);
			setValues(valuesFromObject);
		}
	}, [previewContext.isOpen]);


	const changeText = (index: number, newValue: string) => {
		const helper = [...values];
		const clone = [...(locale as Array<any>)];
		helper[index] = newValue;

		// spreadsheetData.values[row][index].value = newValue;
		// spreadsheetData.values[row][index].imageName = newValue;
		// spreadsheetData.handleChangeSpreadsheetData([...spreadsheetData.values]);
		setValues(helper);

		if (activeCampaign === null) return;
		var copyCampaign = JSON.parse(JSON.stringify(campaign));
		copyCampaign[activeCampaign].creative[row][index].value = newValue;
		// copyCampaign[activeCampaign].creative[row][column].imageName = newValue;
		spreadsheetData.values[row][index].value = newValue;
		// spreadsheetData.values[row][column].imageName = newValue;
		spreadsheetData.handleChangeSpreadsheetData([...spreadsheetData.values]);
		handleChangeCampaign(copyCampaign);
		setLocale([...spreadsheetData.values]);
	};

	// const changeImage = async (index: number, file: File | null) => {
	// 	if (file === null) {
	// 		return;
	// 	}

	// 	const helper = [...values];

	// 	const imageInfo = await new Promise((resolve) => {
	// 		const fileReader = new FileReader();
	// 		fileReader.onload = () => resolve(fileReader.result);
	// 		fileReader.readAsDataURL(file);
	// 	});

	// 	helper[index] = {
	// 		value: imageInfo,
	// 		imageName: file.name,
	// 	} as ITemplateElement;

	// 	setValues(helper);
	// };

	function handleEditImage(index: number) {
		setColumn(index);
		setIsOpen(true);
	}

	return (
		<S.Container isOpen={previewContext.isOpen}>
			<div>
				<section>
					<h3>Linha {previewContext.index + 1}</h3>
					<MdClose
						className="icon"
						onClick={() => previewContext.setIsOpen(false)}
					/>
				</section>
				{columns.map((c, index) => {

					return (
						<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', border: openEdit === c ? '1px solid #00000070' : ''}} key={c}>
							<label htmlFor={c}>{c}</label>
							{locale[previewContext.index][index].tipo ===
							'b64' ? (
								<div>
									<div style={{position: 'relative'}}>
										<ModeEditOutlinedIcon style={{cursor: 'pointer', position: 'relative'}} onClick={() => handleEditImage(index)} />
										{
											isOpen ?
											<AttachModal />
											: <></>
										}
									</div>
								</div>
							) : (
								<input
									key={c}
									name={c}
									type="text"
									value={values[index]}
									onChange={(event) =>
										changeText(index, event.target.value)
									}
								/>
							)}
						</div>
					);
				})}
			</div>
		</S.Container>
	);
};

export default PreviewEditModal;
