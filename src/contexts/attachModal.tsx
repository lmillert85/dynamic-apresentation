import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useMemo,
	useState
} from 'react';

interface IAttachModal {
	isOpen: boolean;
	row: number;
	column: number;
	page: string;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setRow: Dispatch<SetStateAction<number>>;
	setPage: Dispatch<SetStateAction<string>>;
	setColumn: Dispatch<SetStateAction<number>>;
}

const AttachModalContext = createContext({} as IAttachModal);

const AttachModalProvider = ({ children }: PropsWithChildren) => {
	const [isOpen, setIsOpen] = useState(false);
	const [row, setRow] = useState(0);
	const [column, setColumn] = useState(0);
	const [page, setPage] = useState();

	const isOpenMemoized = useMemo(
		() => ({
			isOpen,
			row,
			column,
			page,
			setPage,
			setRow,
			setIsOpen,
			setColumn,
		}),
		[isOpen, row, column, setIsOpen, setColumn, setRow, page, setPage]
	);

	return (
		<AttachModalContext.Provider value={isOpenMemoized}>
			{children}
		</AttachModalContext.Provider>
	);
};

const useAttachModal = () => {
	const context = useContext(AttachModalContext);

	return context;
};

export { AttachModalProvider, useAttachModal };
