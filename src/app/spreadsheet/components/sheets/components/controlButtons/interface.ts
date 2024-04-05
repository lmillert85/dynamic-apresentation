import { Dispatch, SetStateAction } from 'react';
import * as I from '../../interface'

export interface controlButtonProps {
    data: Array<any>;
    historyChanges: Array<I.cellPropsWithCol>;
    lastCell: {colId: string, row: number, value: string};
    selectedCell: { row: number, col: number, colId: string };
    columnsFromTemplate: object;
    setData: Dispatch<any>;
    setAlignTextStyle: Dispatch<SetStateAction<string>>;
    setIsAddNewColumn: Dispatch<SetStateAction<boolean>>;
    setIsRemoveColumnOpen: Dispatch<SetStateAction<boolean>>;
}
