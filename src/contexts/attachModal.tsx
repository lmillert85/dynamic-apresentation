import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react';

export enum contextTypes {
    NEW_CAMPAIGN = 'newCampaign',
    MY_TEMPLATES = 'myTemplates',
    MY_CAMPAIGNS = 'myCampaigns',
    ASSETS = 'assets'
}


interface IAttachModal {
	isOpen: boolean;
	row: number;
	column: number;
	page: string;
	selectedRoute: string;
	newCampaign: string;
	client:string;
	setClient: Dispatch<SetStateAction<string>>;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setRow: Dispatch<SetStateAction<number>>;
	setPage: Dispatch<SetStateAction<string>>;
	setColumn: Dispatch<SetStateAction<number>>;
	setSelectedRoute: Dispatch<SetStateAction<string>>;
	setNewCampaign: Dispatch<SetStateAction<string>>;
}

const AttachModalContext = createContext({} as IAttachModal);

const AttachModalProvider = ({ children }: PropsWithChildren) => {
	const [isOpen, setIsOpen] = useState(false);
	const [row, setRow] = useState(0);
	const [column, setColumn] = useState(0);
	const [page, setPage] = useState();
	const [newCampaign, setNewCampaign] = useState("teste");
	const [client, setClient] = useState("teste3");
	const [selectedRoute, setSelectedRoute] = useState("newCampaign");
	const isOpenMemoized = useMemo(
		() => ({
			isOpen,
			row,
			column,
			page,
			selectedRoute,
			newCampaign,
			client,
			setClient,
			setNewCampaign,
			setPage,
			setRow,
			setIsOpen,
			setColumn,
			setSelectedRoute
		}),
		[isOpen, row, column, setIsOpen, setColumn, setRow, page, setPage, selectedRoute, setSelectedRoute, newCampaign, setNewCampaign, client, setClient]
	);
	
	useEffect(() => {
		console.log('AttachModalContext')
    }, []);

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
