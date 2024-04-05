import { Dispatch, SetStateAction } from 'react';
import { cellPropsWithCol } from '../../interface';

export interface MainInputCellTypes {
    selectedCell: cellPropsWithCol;
    setSelectedCell: Dispatch<SetStateAction<cellPropsWithCol>>;
};
