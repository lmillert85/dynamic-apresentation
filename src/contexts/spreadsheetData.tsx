import { ICreative } from '@dynamic/services/interface';
import {
	PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react';

interface ISpreadsheetDataContextProps {
	spreadsheetData: Array<ICreative>;
	setSpreadsheetData: (context: Array<ICreative>) => void;
}

const SpreadsheetDataContext = createContext(
	{} as ISpreadsheetDataContextProps
);

const SpreadsheetDataProvider = ({ children }: PropsWithChildren) => {
	const [spreadsheetData, setSpreadsheetData] = useState<Array<ICreative>>();

	const spreadsheetMemoized = useMemo(
		() => ({ spreadsheetData, setSpreadsheetData }),
		[spreadsheetData, setSpreadsheetData]
	);
	
	useEffect(() => {
	}, [spreadsheetData]);

	return (
		<SpreadsheetDataContext.Provider value={spreadsheetMemoized}>
			{children}
		</SpreadsheetDataContext.Provider>
	);

};


const useSpreadsheetData = () => {
	const context = useContext(SpreadsheetDataContext);
	return context;
};

export { SpreadsheetDataProvider, useSpreadsheetData };
