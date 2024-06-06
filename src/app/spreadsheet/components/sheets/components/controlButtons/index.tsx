import { useEffect, useRef, useState } from 'react';
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
	FaFileDownload,
	FaFileUpload,
	FaFilter,
	FaPaste,
	FaRedoAlt,
	FaUndoAlt
} from 'react-icons/fa';
import { MdOutlinePlaylistAdd, MdOutlinePlaylistRemove } from 'react-icons/md';
import { useRouter, useParams } from 'next/navigation';
import { SiGooglesheets, SiMarkdown, SiUploaded } from 'react-icons/si';
import * as I from './interface';
import { useCampaign } from '@dynamic/contexts/campaign';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';
import { GetSheets, GetTemplateElementos, PostRowSheets, PostXSLFeed } from '@dynamic/services/feedService';
import readXlsxFile from 'read-excel-file'
import { ICreative, IFeed, ITemplateElement } from '@dynamic/services/interface';
import * as XLSX from 'xlsx';
import { v4 as uuidv4 } from 'uuid';

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
	const { activeCampaign, campaign, handleChangeCampaign, } = useCampaign();
	const spreadsheetData = useSpreadsheetData();
	const refInput = useRef(null);
    const params = useParams();

	useEffect(() => {
		setHistoryPointer(historyChanges.length);
	}, [historyChanges]);

	const handleSetAlignText = (text: 'center' | 'left' | 'right') => {
		setAlignTextStyle(text);
	};

	const handleCopy = (): void => {
	};

	const handlePaste = (): void => {
	};

	const handleCut = (): void => {
	};

	const calcUndoRedo = (type: 'undo' | 'redo') => {
		return type === 'undo' ? historyPointer - 1 : historyPointer + 1;
	};

	const handleUndoAndRedo = (type: 'undo' | 'redo'): void => {
	};

	const handleAddOrRemoveRow = async (type: 'add' | 'remove'): Promise<void> => {
		try {
			if (activeCampaign === null) return;
			var copyspreadsheetData = JSON.parse(JSON.stringify(spreadsheetData.spreadsheetData));
			if (type === 'add') {
				console.log('copyspreadsheetData')
				console.log(copyspreadsheetData)
				copyspreadsheetData = await PostRowSheets(params.creative.toString(), 'add');
			} else if (type === 'remove' && copyspreadsheetData.length > 1) {
				copyspreadsheetData = await PostRowSheets(params.creative.toString(), 'remove');
			}
			spreadsheetData.setSpreadsheetData(copyspreadsheetData);
		} catch (error) {
			console.log(error)
		}
	};

	const handleFileChange = (e: any) => {
		try {
			var copySpread = JSON.parse(JSON.stringify(spreadsheetData.spreadsheetData));
			console.log('copySpread')
			console.log(copySpread)
			var copyspreadsheetData2 = JSON.parse(JSON.stringify(spreadsheetData.spreadsheetData));
			copyspreadsheetData2 = [];			
			copyspreadsheetData2.uuidv = copySpread.uuidv;
			copyspreadsheetData2.uuidv_campaign = copySpread.uuidv_campaign;
			copyspreadsheetData2.uuidv_feed = copySpread.uuidv_feed;
			spreadsheetData.setSpreadsheetData(copyspreadsheetData2);
			// const creative2: IFeed = {} as IFeed;
			// creative2.sheets = [];
			// console.log('creative2')
			// console.log(creative2)
			// PostXSLFeed(creative2, params.creative.toString());
			
			readXlsxFile(e.target.files[0]).then((rows) => {
				const creative: IFeed = {} as IFeed;
				creative.sheets = [];
				console.log('rows')
				console.log(rows)
				for (var i = 1; i < rows.length; i++) {
					var templateElementos = GetTemplateElementos(params.creative.toString());
					for (var j = 0; j < rows[i].length; j++) {
						var index = templateElementos.findIndex((x: { id: string; }) => x.id === rows[0][j].toString());
						if (index === -1) continue;						
						templateElementos[index].value = rows[i][j] + "";
						if (templateElementos[index].tipo === 'b64') {
							if (!rows[i][j].toString().includes('.png')) rows[i][j] += '.png';
							templateElementos[index].imageName = rows[i][j].toString();
						}
					}
					creative.sheets.push({
						elementos: templateElementos,
						aproved: null,
						uuidv: uuidv4(),
						uuidv_campaign: copySpread[0].uuidv_campaign,
						uuidv_feed: copySpread[0].uuidv_feed
					});
				}
				var copyspreadsheetData = JSON.parse(JSON.stringify(spreadsheetData.spreadsheetData));
				copyspreadsheetData = creative.sheets;
				console.log('copySpread 2')
				console.log(copySpread)
				copyspreadsheetData.uuidv = copySpread.uuidv;
				copyspreadsheetData.uuidv_campaign = copySpread.uuidv_campaign;
				copyspreadsheetData.uuidv_feed = copySpread.uuidv_feed;
				spreadsheetData.setSpreadsheetData(copyspreadsheetData);
				e.target.value = '';
				console.log('creative')
				console.log(creative)
				PostXSLFeed(creative, params.creative.toString());
			  })
		} catch (error) {
			console.log('error')
			console.log(error)
		}
	  };

	  const handleDownloadSheet = () => {
		var copyspreadsheetData = JSON.parse(JSON.stringify(spreadsheetData.spreadsheetData));
		const elementos: any = [];
		const title: any = [];
		copyspreadsheetData[0].elementos.forEach((element: any) => {
			title.push(element.id);
		});
		elementos.push(title);
		for (var i = 0; i < copyspreadsheetData.length; i++) {
			const el = [];
			for (var j = 0; j < copyspreadsheetData[i].elementos.length; j++) {
				if (copyspreadsheetData[i].elementos[j].tipo === 'b64') el.push(copyspreadsheetData[i].elementos[j].imageName)
				else el.push(copyspreadsheetData[i].elementos[j].value)
			}
			elementos.push(el);
		}
		const worksheet: any = XLSX.utils.json_to_sheet(elementos);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
		XLSX.writeFile(workbook, "DataSheet.xlsx");
	  }

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

						style={{cursor: 'not-allowed', opacity: '0.4'}}
						title="Alinhar a esquerda"
						onClick={() => handleSetAlignText('left')}
					/>
					<AiOutlineAlignCenter
						style={{cursor: 'not-allowed', opacity: '0.4'}}
						title="Alinhar ao centro"
						onClick={() => handleSetAlignText('center')}
					/>
					<AiOutlineAlignRight
						style={{cursor: 'not-allowed', opacity: '0.4'}}
						title="Alinhar a direita"
						onClick={() => handleSetAlignText('right')}
					/>
				</div>
			</section>

			<section>
				<p>Edicao</p>
				<div>
					<FaCopy style={{cursor: 'not-allowed', opacity: '0.4'}} title="Copiar" onClick={() => handleCopy()} />
					<FaPaste style={{cursor: 'not-allowed', opacity: '0.4'}} title="Colar" onClick={() => handlePaste()} />
					<FaCut style={{cursor: 'not-allowed', opacity: '0.4'}} title="Cortar" onClick={() => handleCut()} />
					<FaFilter style={{cursor: 'not-allowed', opacity: '0.4'}} title="Filtrar" />
					<FaUndoAlt
						style={{cursor: 'not-allowed', opacity: '0.4'}}
						title="Desfazer"
						onClick={() => handleUndoAndRedo('undo')}
					/>
					<FaRedoAlt
						style={{cursor: 'not-allowed', opacity: '0.4'}}
						title="Refazer"
						onClick={() => handleUndoAndRedo('redo')}
					/>
					<MdOutlinePlaylistAdd
						title="Adicionar linha 2"
						onClick={() => handleAddOrRemoveRow('add')}
					/>
					<MdOutlinePlaylistRemove
						style={{ cursor: spreadsheetData.spreadsheetData.length <= 1 ? 'not-allowed' : 'pointer'}}
						title="Remover linha"
						onClick={() => handleAddOrRemoveRow('remove')}
					/>
					<TbColumnInsertRight
						style={{cursor: 'not-allowed', opacity: '0.4'}}
						title="Inserir coluna"
						onClick={() => setIsAddNewColumn(true)}
					/>
					<TbColumnRemove
						style={{cursor: 'not-allowed', opacity: '0.4'}}
						title="Remover coluna"
						onClick={() => setIsRemoveColumnOpen(true)}
					/>
					<FaFileUpload
						title="Importar planilha"
						onClick={() => refInput.current?.click()}
					/>
					<FaFileDownload
						title="Download planilha"
						onClick={() => handleDownloadSheet()}
					/>
				</div>
			</section>
			<input style={{display: 'none'}} ref={refInput} type='file' onChange={(e) => handleFileChange(e)}></input>
		</ControlButtonContainer>
	);
};

export default ControlButtons;
