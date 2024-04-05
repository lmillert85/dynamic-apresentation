import * as S from './style';
import * as I from './interface';
import { ChangeEvent } from 'react';

const MainSelectedCell: React.FC<I.MainInputCellTypes> = ({
	selectedCell,
	setSelectedCell
}) => {
    const handleChangeSelectedCellValue = (evt: ChangeEvent<HTMLInputElement>) => {
        const clone = {...selectedCell};

        clone.value = evt.target.value;
        setSelectedCell({...clone});
    }

	return (
		<S.MainInputCell
			value={selectedCell.value}
			placeholder="Selecione uma celula..."
			onChange={(evt) => handleChangeSelectedCellValue(evt)}
		/>
	);
};

export default MainSelectedCell;
