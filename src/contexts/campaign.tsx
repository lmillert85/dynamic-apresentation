import { ITemplate, ITemplateElement } from '@dynamic/@types/template.interface';
import {
	PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react';
import { ICampaign } from '@dynamic/services/interface';

interface ICampaignContextProps {
	activeCampaign: number | null;
	campaign: Array<ICampaign>;
	handleChangeCampaign: (context: Array<ICampaign>) => void;
	handleChangeActiveCampaign: (context: number | null) => void;
	currentPage: number;
	setCurrentPage: (context: number) => void;
	printing: boolean;
	setPrinting: (context: boolean) => void;
}

const CampaignContext = createContext(
	{} as ICampaignContextProps
);

const CampaignDataProvider = ({ children }: PropsWithChildren) => {
	const [activeCampaign, setActiveCampaign] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [printing, setPrinting] = useState<boolean>(false);
	const [campaign, setCampaign] = useState<Array<ICampaign>>([]);

	const handleChangeCampaign = useCallback(
		(context: Array<ICampaign>) => {
			setCampaign(context);
		},
		[]
	);
	const handleChangeActiveCampaign = useCallback(
		(context: number | null) => {
			setActiveCampaign(context);
		},
		[]
	);


	const campaignMemoized = useMemo(
		() => ({ campaign, handleChangeCampaign, activeCampaign, handleChangeActiveCampaign, currentPage, setCurrentPage, printing, setPrinting }),
		[ campaign, handleChangeCampaign, activeCampaign, handleChangeActiveCampaign, currentPage, setCurrentPage, printing, setPrinting ]
	);
	return (
		<CampaignContext.Provider value={campaignMemoized}>
			{children}
		</CampaignContext.Provider>
	);
};


const useCampaign = () => {
	const context = useContext(CampaignContext);
	return context;
};

export { CampaignDataProvider, useCampaign };
