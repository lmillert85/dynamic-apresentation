import * as I from '../../interface';

export interface cellProps {
	row: number;
	value: string;
	colId: string;
}

export interface cellPropsWithCol extends cellProps {
	col: number;
}

export interface styleSpreadsheetContainer {
	textAlign: string;
}

export type columnType =
	| 'text'
	| 'checkbox'
	| 'integer'
	| 'float'
	| 'date'
	| 'percentual'
	| 'image';

export interface initialValuesType {
	data: Array<object>;
	previousSelectedCell: { colId: string; row: number; value: string };
	selectedCell: { colId: string; row: number; value: string };
	textAlignStyle: string;
	historyChanges: [];
	isAddColumnComponentOpen: false;
	addColumnName: string;
	addColumnType: string;
}

export interface spreadsheetProps extends I.HTMLTemplateProps {}
