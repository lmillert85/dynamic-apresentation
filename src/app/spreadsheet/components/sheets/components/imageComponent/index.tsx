import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CellComponent, CellProps, Column } from 'react-datasheet-grid';
import * as S from './style';
import { useAttachModal } from '@dynamic/contexts/attachModal';
import * as I from './interface';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';

const ImageComponent = React.memo<CellProps<I.ImageCellProps | null, any>>(
	({ rowIndex, columnIndex, rowData }) => {
		const spreadsheetData = useSpreadsheetData();
		const [imageName, setImageName] = useState(() => {
			return spreadsheetData.spreadsheetData[rowIndex].elementos[columnIndex].imageName;
		});
		const { setIsOpen, setRow, setColumn } = useAttachModal();

		const handleSetImageInCell = () => {
			const spreadsheetData = useSpreadsheetData();
			const row = spreadsheetData.spreadsheetData[rowIndex];
			let imgName = '';
			if (row !== null && columnIndex !== null && row.elementos[columnIndex]) {
				const tipo = row.elementos[columnIndex].tipo;
				tipo === 'b64'
					? (imgName = row.elementos[columnIndex].imageName ?? '-')
					: (imgName = row.elementos[columnIndex].value ?? '');
			} else {
                imgName = '-'
            }
			setImageName(imgName);
		};

		const handleClick = (evt: any) => {
			setIsOpen(true);
			setRow(rowIndex);
			setColumn(columnIndex);
		};

		useEffect(() => {
			setImageName(spreadsheetData.spreadsheetData[rowIndex].elementos[columnIndex].imageName);
		});

		return (
			<S.BtnAssetsSearch
				type="button"
				value={imageName}
				onClick={(evt) => handleClick(evt)}
				onChange={() => handleSetImageInCell()}
			/>
		);
	}
);

ImageComponent.displayName = 'ImageComponent';

const imageColumn: Partial<Column<string | null>> = {
	component: ImageComponent as CellComponent<string | null>
};

export default imageColumn;
