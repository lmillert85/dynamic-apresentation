import {
	PropsWithChildren,
	createContext,
	useContext,
	useLayoutEffect,
	useMemo,
	useState
} from 'react';

interface IDynamic {
	loading: ILoading;
	teste: number;	
	setTeste: (context: number) => void;
	setLoading: (context: ILoading) => void;
}

interface ILoading {
    show: boolean;
    progress: number | null
}

const DynamicContext = createContext({} as IDynamic);

const DynamicProvider = ({ children }: PropsWithChildren) => {
	const [loading, setLoading] = useState<ILoading>({show: false, progress: null});
	const [teste, setTeste] = useState<number>(0);

	useLayoutEffect(() => {
		console.log('loading')
	}, [loading])
	
	const isOpenMemoized = useMemo(
		() => ({
            loading, setLoading, teste, setTeste
		}),
		[loading, setLoading, teste, setTeste]
	);

	return (
		<DynamicContext.Provider value={isOpenMemoized}>
			{children}
		</DynamicContext.Provider>
	);
};


const useDynamic = () => {
	const context = useContext(DynamicContext);

	return context;
};

export { DynamicProvider, useDynamic };
