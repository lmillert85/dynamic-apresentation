import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useMemo,
	useState
} from 'react';

interface IPreviewEditModalContext {
	isOpen: boolean;
	index: number;
	object: object;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setIndex: Dispatch<SetStateAction<number>>;
	setObject: Dispatch<SetStateAction<object>>;
}

const PreviewEditModalContext = createContext({} as IPreviewEditModalContext);

const PreviewEditModalProvider = ({ children }: PropsWithChildren) => {
	const [isOpen, setIsOpen] = useState(false);
	const [index, setIndex] = useState(0);
	const [object, setObject] = useState({});

	const memoized = useMemo(
		() => ({
			isOpen,
			index,
			object,
			setIsOpen,
			setIndex,
			setObject
		}),
		[isOpen, index, object, setIsOpen, setIndex, setObject]
	);

	return (
		<PreviewEditModalContext.Provider value={memoized}>
			{children}
		</PreviewEditModalContext.Provider>
	);
};

const usePreviewEditModalContext = () => {
	const context = useContext(PreviewEditModalContext);
	return context;
};

export { usePreviewEditModalContext, PreviewEditModalProvider };
