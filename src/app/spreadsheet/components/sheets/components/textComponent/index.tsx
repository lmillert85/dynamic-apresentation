import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CellComponent, CellProps, Column } from 'react-datasheet-grid';
import * as S from './style';
import { useAttachModal } from '@dynamic/contexts/attachModal';
import * as I from './interface';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';
import { useCampaign } from '@dynamic/contexts/campaign';

const TextComponent = React.memo<CellProps<I.ImageCellProps | null, any>>(
	({ rowIndex, columnIndex }) => {		
		const spreadsheetData = useSpreadsheetData();
		const [textName, setTextName] = useState(() => {
			return spreadsheetData.spreadsheetData[rowIndex].elementos[columnIndex].value;
		});
		const refInput = useRef(null);

		function handleChangeText(evt: React.ChangeEvent<HTMLInputElement>): void {
			var copyspreadsheetData = JSON.parse(JSON.stringify(spreadsheetData.spreadsheetData));
			copyspreadsheetData[rowIndex].elementos[columnIndex].value = evt.target.value;
			spreadsheetData.setSpreadsheetData(copyspreadsheetData);
		}

		function handleClick(): void {
			if (refInput && refInput.current) refInput.current.value = textName;
		}

		return (
			<input ref={refInput} style={{border: 0, width: '90%', height: '90%'}} placeholder={textName} onClick={() => handleClick()} onBlur={(evt) => handleChangeText(evt)}></input>
		);
	}
);

TextComponent.displayName = 'TextComponent';

const textColumn: Partial<Column<string | null>> = {
	component: TextComponent as CellComponent<string | null>
};

export default textColumn;
