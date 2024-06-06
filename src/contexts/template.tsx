import {
    Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useMemo,
	useState
} from 'react';
import { getElementsTemplate } from '@dynamic/helpers/banner';
import { ITemplate } from '@dynamic/@types/template.interface';


interface ITemplateContextProps {
	listaTemplates: Array<ITemplate | null>;
	activeTemplate: ITemplate | null;
    setActiveTemplate: Dispatch<SetStateAction<ITemplate>>;
    setListaTemplates: Dispatch<SetStateAction<Array<ITemplate>>>;
}

const TemplateDataContext = createContext({} as ITemplateContextProps);

const TemplateDataProvider = ({ children }: PropsWithChildren) => {	
	const [listaTemplates, setListaTemplates] = useState<
		Array<ITemplate | null>
	>([]);
	const [activeTemplate, setActiveTemplate] = useState(null);

	const memoized = useMemo(
		() => ({
			listaTemplates,
			setListaTemplates,
			activeTemplate,
			setActiveTemplate
		}),
		[listaTemplates, setListaTemplates, activeTemplate, setActiveTemplate]
	);

	return (
		<TemplateDataContext.Provider value={memoized}>
			{children}
		</TemplateDataContext.Provider>
	);
};

const useTemplateData = () => {
	const context = useContext(TemplateDataContext);
	return context;
};

export { TemplateDataProvider, useTemplateData };
