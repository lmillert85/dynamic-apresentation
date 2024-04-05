import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useMemo,
	useState
} from 'react';

interface SheetImgAttachState {
	imgNames: string[];
	setImgNames: Dispatch<SetStateAction<string[]>>;
}

const SheetImgAttachContext = createContext({} as SheetImgAttachState);

const SheetImgAttachProvider = ({ children }: PropsWithChildren) => {
	const [imgNames, setImgNames] = useState<Array<string>>([]);

	const memoized = useMemo(
		() => ({
			imgNames,
			setImgNames
		}),
		[imgNames, setImgNames]
	);

	return (
		<SheetImgAttachContext.Provider value={memoized}>
			{children}
		</SheetImgAttachContext.Provider>
	);
};

const useSheetImgAttach = () => {
	const context = useContext(SheetImgAttachContext);
	return context;
};

export { SheetImgAttachProvider, useSheetImgAttach };
