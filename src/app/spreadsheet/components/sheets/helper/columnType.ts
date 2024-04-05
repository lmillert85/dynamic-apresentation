import {
	Column,
	checkboxColumn,
	floatColumn,
	intColumn,
	isoDateColumn
} from 'react-datasheet-grid';
import imageColumn from '../components/imageComponent';
import textColumn from '../components/textComponent';

const columnsType = {
	text: textColumn,
	b64: imageColumn,
	int: intColumn,
	flt: floatColumn,
	chk: checkboxColumn,
	dat: isoDateColumn,
};

const ReturnColumnType = (typeColumn: string): Column => {
	return columnsType[typeColumn as keyof typeof columnsType] ?? textColumn;
	// return  imageColumn;
};

export { ReturnColumnType };
