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
import templateDynamic2 from '../../public/templates/vivo.template.html';
import { getElementsTemplate } from '@dynamic/helpers/banner';
import { ICampaign } from '@dynamic/services/interface';

interface ICampaignContextProps {
	activeCampaign: number | null;
	campaign: Array<ICampaign>;
	handleChangeCampaign: (context: Array<ICampaign>) => void;
	handleChangeActiveCampaign: (context: number | null) => void;
}

const CampaignContext = createContext(
	{} as ICampaignContextProps
);

const CampaignDataProvider = ({ children }: PropsWithChildren) => {
	const [activeCampaign, setActiveCampaign] = useState<number | null>(null);
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
		() => ({ campaign, handleChangeCampaign, activeCampaign, handleChangeActiveCampaign }),
		[campaign, handleChangeCampaign, activeCampaign, handleChangeActiveCampaign]
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
