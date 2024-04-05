import { Dispatch, SetStateAction } from 'react';
import { Column } from 'react-datasheet-grid';

export interface addColumnProps {
	setIsOpen: Dispatch<SetStateAction<boolean>>;
    setColumns: Dispatch<SetStateAction<Column[]>>;
    columns: Column[];
}
