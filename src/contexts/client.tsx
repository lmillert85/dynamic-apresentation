import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useMemo,
	useState
} from 'react';
import { IClients, IFormats } from '../services/interface';
import { ITemplate } from '@dynamic/@types/template.interface';

interface IClientsContextProps {
	clients: Array<IClients>;
	setClients: Dispatch<SetStateAction<Array<IClients>>>;
	newCampaign: string;
	setNewCampaign: Dispatch<SetStateAction<string>>;
	activeClient: IClients;
	setActiveClient: Dispatch<SetStateAction<IClients>>;
}

interface ICampaign {
	uuidv: string,
	id: number | null,
    client: string,
    name: string,
    aproved: Array<number>,
    reproved: Array<number>,
    created: string,
	template: ITemplate | null,
    amount: number,
    formats: Array<IFormats>
}

const ClientDataContext = createContext({} as IClientsContextProps);

const ClientDataProvider = ({ children }: PropsWithChildren) => {
	const [newCampaign, setNewCampaign] = useState<string>();
	const [activeClient, setActiveClient] = useState<IClients>();
	const [clients, setClients] = useState<Array<IClients>>([]);
	const memoized = useMemo(
	() => ({
		clients, setClients,
		newCampaign, setNewCampaign,
		activeClient, setActiveClient
	}),
	[clients, setClients, newCampaign, setNewCampaign, activeClient, setActiveClient]
	);

	return (
		<ClientDataContext.Provider value={memoized}>
			{children}
		</ClientDataContext.Provider>
	);
};

const useClientData = () => {
	const context = useContext(ClientDataContext);
	return context;
};

export { ClientDataProvider, useClientData };
