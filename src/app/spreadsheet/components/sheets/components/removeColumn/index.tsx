import * as S from './style';
import * as I from './interface';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';

const RemoveColumn: React.FC<I.RemoveColumnProps> = ({
	columns,
	setColumns,
    setIsRemoveColumnComponentOpen
}) => {
    const [columnId, setColumnId] = useState('');

    const handleRemoveColumn = (): void => {
        const clone = [...columns];
        const cloneFiltred = clone.filter(cloneChild => cloneChild.id !== columnId);

        setColumns([...cloneFiltred]);
        setColumnId('');
        setIsRemoveColumnComponentOpen(false);
    };

	return (
		<S.Container>
			<section>
				<div>
					<h1>Selecione uma coluna para remove-la</h1>
					<span onClick={() => setIsRemoveColumnComponentOpen(false)}>
						<IoMdClose />
					</span>
				</div>

				<select value={columnId} onChange={evt => setColumnId(evt.target.value)}>
                    {columnId === '' && <option>Selecione uma colunas</option>}
					{columns.map((column) => (
						<option value={column.id} key={column.id}>
							{column.title}
						</option>
					))}
				</select>

				<button type="button" onClick={() => handleRemoveColumn()}>Remover</button>
			</section>
		</S.Container>
	);
};

export default RemoveColumn;
