import { useEffect, useState } from 'react';
import {
	TbColumnInsertRight,
	TbColumnRemove,
	TbSquareChevronRightFilled
} from 'react-icons/tb';
import { ControlButtonContainer } from './style';
import {
	AiOutlineAlignCenter,
	AiOutlineAlignLeft,
	AiOutlineAlignRight,
	AiOutlineCloudUpload
} from 'react-icons/ai';
import {
	FaCopy,
	FaCut,
	FaFilter,
	FaPaste,
	FaRedoAlt,
	FaUndoAlt
} from 'react-icons/fa';
import { MdOutlinePlaylistAdd, MdOutlinePlaylistRemove } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { SiGooglesheets } from 'react-icons/si';
import * as I from './interface';
import { useSetLocaleSyncTemplateData } from '@dynamic/hooks/localStorage';
import { useTemplateData } from '@dynamic/contexts/template';
import { useCampaign } from '@dynamic/contexts/campaign';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';

const ControlButtons: React.FC<I.controlButtonProps> = ({
	selectedCell,
	data,
	lastCell,
	historyChanges,
	columnsFromTemplate,
	setData,
	setAlignTextStyle,
	setIsAddNewColumn,
	setIsRemoveColumnOpen
}) => {
	const [historyPointer, setHistoryPointer] = useState(historyChanges.length);
	const router = useRouter();
	const setLocale = useSetLocaleSyncTemplateData;
	const { activeCampaign, campaign, handleChangeCampaign, } = useCampaign();
	const spreadsheetData = useSpreadsheetData();

	useEffect(() => {
		setHistoryPointer(historyChanges.length);
	}, [historyChanges]);

	const handleSetAlignText = (text: 'center' | 'left' | 'right') => {
		setAlignTextStyle(text);
	};

	const handleCopy = (): void => {
		window.localStorage.setItem('dynamicCopy', lastCell.value);
	};

	const handlePaste = (): void => {
		const copy = window.localStorage.getItem('dynamicCopy');

		const helper = [...data];
		helper[selectedCell.row][selectedCell.colId] = copy;

		setData([...helper]);
	};

	const handleCut = (): void => {
		handleCopy();

		const helper = [...data];
		helper[lastCell.row][lastCell.colId] = '';

		setData([...helper]);
	};

	const calcUndoRedo = (type: 'undo' | 'redo') => {
		return type === 'undo' ? historyPointer - 1 : historyPointer + 1;
	};

	const handleUndoAndRedo = (type: 'undo' | 'redo'): void => {
		if (type === 'redo' && historyPointer === historyChanges.length - 1)
			return;

		const helper = [...data];
		const index = historyPointer - 1 < 0 ? 0 : calcUndoRedo(type);
		const { colId, row, value } = historyChanges[index];

		helper[row][colId] = value;

		setHistoryPointer(() => calcUndoRedo(type));
		setData([...helper]);
	};

	const handleAddOrRemoveRow = (type: 'add' | 'remove'): void => {
		try {
			var copyspreadsheetData = JSON.parse(JSON.stringify(spreadsheetData.spreadsheetData));
			console.log('copyspreadsheetData')
			console.log(copyspreadsheetData)
			copyspreadsheetData.push(copyspreadsheetData[0]);
			spreadsheetData.setSpreadsheetData(copyspreadsheetData);
			// const helper = data.slice();
			// if (helper.length <= 0 && type === 'remove') return;
			// if (activeCampaign === null) return;
			// var copyCampaign = JSON.parse(JSON.stringify(campaign));
			// if (type === 'add') {
			// 	copyCampaign[activeCampaign].creative.push(copyCampaign[activeCampaign].templateCols);
			// 	helper.push(copyCampaign[activeCampaign].templateCols);
			// } else {
			// 	copyCampaign[activeCampaign].creative.pop();
			// 	helper.pop();
			// }
			// handleChangeCampaign(copyCampaign);
			// setData([...helper]);
			// setLocale(helper);
		} catch (error) {
			console.log('error')
			console.log(error)
		}
	};

	return (
		<ControlButtonContainer>
			<TbSquareChevronRightFilled className="dynamicIcon" />

			<span>
				<p>{activeCampaign !== null ? campaign[activeCampaign].name : ''}</p>
				<AiOutlineCloudUpload className="cloudSaveIcon" />
			</span>

			<section>
				<p>Texto</p>
				<div>
					<AiOutlineAlignLeft
						title="Alinhar a esquerda"
						onClick={() => handleSetAlignText('left')}
					/>
					<AiOutlineAlignCenter
						title="Alinhar ao centro"
						onClick={() => handleSetAlignText('center')}
					/>
					<AiOutlineAlignRight
						title="Alinhar a direita"
						onClick={() => handleSetAlignText('right')}
					/>
				</div>
			</section>

			<section>
				<p>Edicao</p>
				<div>
					<FaCopy title="Copiar" onClick={() => handleCopy()} />
					<FaPaste title="Colar" onClick={() => handlePaste()} />
					<FaCut title="Cortar" onClick={() => handleCut()} />
					<FaFilter title="Filtrar" />
					<FaUndoAlt
						title="Desfazer"
						onClick={() => handleUndoAndRedo('undo')}
					/>
					<FaRedoAlt
						title="Refazer"
						onClick={() => handleUndoAndRedo('redo')}
					/>
					<MdOutlinePlaylistAdd
						title="Adicionar linha 2"
						onClick={() => handleAddOrRemoveRow('add')}
					/>
					<MdOutlinePlaylistRemove
						title="Remover linha"
						onClick={() => handleAddOrRemoveRow('remove')}
					/>
					<TbColumnInsertRight
						title="Inserir coluna"
						onClick={() => setIsAddNewColumn(true)}
					/>
					<TbColumnRemove
						title="Remover coluna"
						onClick={() => setIsRemoveColumnOpen(true)}
					/>
					<SiGooglesheets
						title="Importar planilha"
						onClick={() => router.push('/')}
					/>
				</div>
			</section>
		</ControlButtonContainer>
	);
};

export default ControlButtons;
