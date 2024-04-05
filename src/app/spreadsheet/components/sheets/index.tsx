'use client';

import * as S from './style';
import React, { useRef, useState } from 'react';
import { GetCampaign, GetSheets } from '@dynamic/services/feedService';
import { useRouter } from 'next/navigation';
import { Column, ContextMenuItem, DataSheetGrid, DataSheetGridRef, DynamicDataSheetGrid, createContextMenuComponent, keyColumn } from 'react-datasheet-grid';
// import { ReturnColumnType } from '../components/sheets/helper/columnType';
import { internationalizationContextMenu } from './helper/internationalization';
import { ContainerSpreadsheet } from './style';
import ControlButtons from './components/controlButtons';
import MainSelectedCell from './components/mainSelectedCell';
import * as I from './interface';
import 'react-datasheet-grid/dist/style.css';
import { ReturnColumnType } from './helper/columnType';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';
import Tabs from '@dynamic/components/tabs';
import * as IT from '@dynamic/@types/tabSelectedType.interface';

function Spreadsheet () {
	console.log('Spreadsheet Spreadsheet')
	const spreadsheetData = useSpreadsheetData();
	const [selectedCell, setSelectedCell] = useState<I.cellPropsWithCol>({
		col: 0,
		row: 0,
		colId: '',
		value: ''
	});
    
	const [previousSelectedCell, setPreviousSelectedCell] =
    useState<I.cellProps>({
        colId: '',
        row: 0,
        value: ''
    });
	const [columnsFromTemplate, setColumnsFromTemplate] = useState({});
	const [textAlignStyle, setTextAlignStyle] = useState('left');
	const [isRemoveColumnComponentOpen, setIsRemoveColumnComponentOpen] =
		useState(false);
	const [isAddColumnComponentOpen, setIsAddColumnComponentOpen] =
		useState(false);
	const [historyChanges, setHistoryChanges] = useState<
    Array<I.cellPropsWithCol>>([]);
	const ContextMenu = createContextMenuComponent((item: ContextMenuItem) => (
		<>{internationalizationContextMenu(item)}</>
	)) as unknown as any;
	const ref = useRef<DataSheetGridRef>(null);    
	const router = useRouter();
    
    const cols = spreadsheetData.spreadsheetData[0].elementos.map((element) => {
        return {
            ...keyColumn(element.id, ReturnColumnType(element.tipo)),
            title: element.id
        } as unknown as Column;
    });

    function handleChangeSpreadsheet(evt: any) {
        console.log('evt 213')
        console.log(evt)
    }

    function handleChangeSheet(evt: any) {
        console.log('evt')
        console.log(evt)
    }

    function fixSheetSize() {        
		var d = document.getElementsByClassName('dsg-container');
        console.log('d[0]')
        console.log(d.length)
		 var height = spreadsheetData.spreadsheetData.length * 40 + 120;
		 d[0].style.height = `${height}px`;		
		 d[0].style.minHeight = `${500}px`;
    }
    
	return (
		<S.Container>
			<ControlButtons
				data={spreadsheetData.spreadsheetData}
				setData={(evt) => handleChangeSheet(evt)}
				selectedCell={selectedCell}
				lastCell={previousSelectedCell}
				historyChanges={historyChanges}
				columnsFromTemplate={columnsFromTemplate}
				setAlignTextStyle={setTextAlignStyle}
				setIsAddNewColumn={setIsAddColumnComponentOpen}
				setIsRemoveColumnOpen={setIsRemoveColumnComponentOpen}
			/>
			<MainSelectedCell
				selectedCell={selectedCell}
				setSelectedCell={setSelectedCell}
			/>
			<ContainerSpreadsheet textAlign={textAlignStyle} style={{position: 'relative'}}>
				<DynamicDataSheetGrid
					value={spreadsheetData.spreadsheetData}
					ref={ref}
					className="datasheet"
					contextMenuComponent={ContextMenu}
					columns={cols}
					onActiveCellChange={(evt) => {
						fixSheetSize();
						}
					}
				/>
			</ContainerSpreadsheet>
		</S.Container>
	);
};

export default Spreadsheet;
