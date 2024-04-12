import { usePreviewEditModalContext } from '@dynamic/contexts/previewEditModal';
import * as S from './style';
import { MdClose } from 'react-icons/md';
import { useEffect, useState } from 'react';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { useAttachModal } from '@dynamic/contexts/attachModal';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';
import { IUpdateFeed } from '@dynamic/services/interface';
import { PostChangeSheets } from '@dynamic/services/feedService';

const PreviewEditModal = () => {
	const [columns, setColumns] = useState<Array<string>>([]);
	const [values, setValues] = useState<Array<any>>([]);
	const [openEdit, setOpenEdit] = useState<string | null>(null);
	const previewContext = usePreviewEditModalContext();
	const spreadsheetData = useSpreadsheetData();
	const { setIsOpen, setColumn, row } = useAttachModal();
	
	useEffect(() => {
		if (previewContext.isOpen) {
			const object = spreadsheetData.spreadsheetData[previewContext.index].elementos;
			const keys = object.map((item) => item.id);
			const valuesFromObject = object.map((item) =>
				item.tipo === 'b64' ? item.imageName : item.value
			);
			setColumns(keys);
			setValues(valuesFromObject);
		}
	}, [previewContext.isOpen]);


	const changeText = async (index: number, newValue: string) => {
		var copyspreadsheetData = JSON.parse(JSON.stringify(spreadsheetData.spreadsheetData));
		copyspreadsheetData[previewContext.index].elementos[index].value = newValue;
		spreadsheetData.setSpreadsheetData(copyspreadsheetData);
		var update: IUpdateFeed = {
			row: previewContext.index,
			column: index,
			value: newValue,
			imageName: null,
			uuidv: 'teste'
		};
		await PostChangeSheets(update);
	};

	function handleEditImage(index: number) {
		setColumn(index);
		setIsOpen(true);
	}

	function handleClick(event: any, value: string): void {
		event.target.value = value;
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
							{spreadsheetData.spreadsheetData[previewContext.index].elementos[index].tipo ===
							'b64' ? (
								<div>
									<div style={{position: 'relative'}}>
										<ModeEditOutlinedIcon
											style={{cursor: 'pointer', position: 'relative'}}
											onClick={() => handleEditImage(index)}
										/>
									</div>
								</div>
							) : (
								<input
									key={c}
									name={c}
									type="text"
									placeholder={values[index]}
									onClick={(event) => handleClick(event, values[index])}
									onBlur={(event) =>
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
