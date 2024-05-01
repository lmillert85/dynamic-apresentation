import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useMemo,
	useState
} from 'react';
import { IClients } from '../services/interface';

interface IClientsContextProps {
	clients: Array<IClients>;
	setClients: Dispatch<SetStateAction<Array<IClients>>>;
	newCampaign: ICampaign;
	setNewCampaign: Dispatch<SetStateAction<ICampaign>>;
	activeClient: IClients;
	setActiveClient: Dispatch<SetStateAction<IClients>>;
}

interface ICampaign {
	name: string;
	client: string;
	client_uuidv: string;
}

const ClientDataContext = createContext({} as IClientsContextProps);

const ClientDataProvider = ({ children }: PropsWithChildren) => {
	const [newCampaign, setNewCampaign] = useState<ICampaign>();
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
