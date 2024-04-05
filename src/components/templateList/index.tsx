import { useRouter } from 'next/navigation';
import * as S from './style';
import * as I from './interface';
import { useTemplateData } from '@dynamic/contexts/template';
import InnerHTML from '../innerHTML';
import { ITemplate } from '@dynamic/@types/template.interface';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';

const TemplateList: React.FC<I.TemplateProps> = ({
	shouldRedirect = false
}) => {
	const router = useRouter();
	const { listaTemplates, activeTemplate, setActiveTemplate } = useTemplateData();
	const spreadsheetData = useSpreadsheetData();

	const handleAction = (template: ITemplate) => {
		// if (shouldRedirect && activeTemplate?.name === template.name) {
		// 	router.push('spreadsheet?template=selectedTemplate');
		// }

		// const dynamicFields = template.elementos.filter(
		// 	(elem) => elem.dinamico === true
		// );

		// setSyncData([dynamicFields]);
		// setLocale(template.banner);
		// setActiveTemplate(template);
		// setWidthHeight(template.width, template.height);
    };

	return (
		<S.Container>
			{listaTemplates.map((template) => {
				if (template) {
					return (
						<></>
						// <div
						// 	className={template.name}
						// 	key={template.name}
						// 	onClick={() => handleAction(template)}
						// >
						// 	<InnerHTML
						// 		html={template.banner}
						// 		width={template.width}
						// 		height={template.height}
						// 		backup={false}
						// 		isSelected={
						// 			activeTemplate?.name === template.name
						// 		}
						// 	/>
						// </div>
					);
				}
			})}
		</S.Container>
	);
};

export default TemplateList;
