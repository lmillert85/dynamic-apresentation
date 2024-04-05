import { AiOutlineClose } from 'react-icons/ai';
import * as S from './style';
import * as I from './interface';
import { columnType } from '../../interface';
import {
	checkboxColumn,
	floatColumn,
	intColumn,
	isoDateColumn,
	keyColumn,
	percentColumn,
	textColumn
} from 'react-datasheet-grid';
import { useState } from 'react';
import imageColumn from '../imageComponent';

const AddColumn: React.FC<I.addColumnProps> = ({
	setIsOpen,
	setColumns,
	columns
}) => {
	const [columnName, setColumnName] = useState('');
	const [columnType, setColumnType] = useState<columnType>('text');

	const handleAddColumn = (): void => {
		const clone = [...columns];
		switch (columnType) {
			case 'text':
				clone.push({
					...keyColumn(columnName, textColumn),
					title: columnName
				});
				break;
			case 'checkbox':
				clone.push({
					...keyColumn(columnName, checkboxColumn),
					title: columnName
				});
				break;
			case 'date':
				clone.push({
					...keyColumn(columnName, isoDateColumn),
					title: columnName
				});
				break;
			case 'float':
				clone.push({
					...keyColumn(columnName, floatColumn),
					title: columnName
				});
				break;
			case 'integer':
				clone.push({
					...keyColumn(columnName, intColumn),
					title: columnName
				});
				break;
			case 'percentual':
				clone.push({
					...keyColumn(columnName, percentColumn),
					title: columnName
				});
				break;
			case 'image':
				clone.push({
					...keyColumn(columnName, imageColumn),
					title: columnName
				});
				break;
		}

		setColumns([...clone]);
		setColumnName('');
		setColumnType('text');
		setIsOpen(false);
	};

	return (
		<S.Container>
			<section>
				<span>
					<h1>Adicione uma coluna</h1>
					<span
						className="closeIcon"
						onClick={() => setIsOpen(false)}
					>
						<AiOutlineClose />
					</span>
				</span>

				<input
					placeholder="Nome da coluna"
					type="text"
					value={columnName}
					onChange={(evt) => setColumnName(evt.target.value)}
				/>

				<select
					value={columnType}
					onChange={(evt) =>
						setColumnType(evt.target.value as columnType)
					}
				>
					<option value="text">Texto</option>
					<option value="checkbox">Checkbox</option>
					<option value="integer">Numero inteiro</option>
					<option value="float">Numero decimal</option>handleAddColumn
					<option value="date">Data</option>
					<option value="percentual">Percentual</option>
                    <option value="image">Imagem</option>
				</select>

				<button type="button" onClick={() => handleAddColumn()}>
					Adicionar
				</button>
			</section>
		</S.Container>
	);
};

export default AddColumn;
