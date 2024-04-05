import { ContextMenuItem } from 'react-datasheet-grid';

const translation = {
	PASTE: 'Colar',
	INSERT_ROW_BELLOW: 'Inserir linha',
	DELETE_ROW: 'Deletar linha',
	DUPLICATE_ROW: 'Duplicar linha',
	COPY: 'Copiar',
	CUT: 'Cortar',
	DELETE_ROWS: 'Deletar linhas',
	DUPLICATE_ROWS: 'Duplicar linhas'
};

export const internationalizationContextMenu = (item: ContextMenuItem) => {
    return translation[item.type] || item.type;
};
