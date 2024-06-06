import { useRouter } from 'next/navigation';
import * as S from './style';
import * as I from './interface';
import { useTemplateData } from '@dynamic/contexts/template';
import InnerHTML from '../innerHTML';
import { ITemplate } from '@dynamic/@types/template.interface';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';
import { useEffect, useState } from 'react';
import { GetTemplates } from '@dynamic/services/feedService';

const TemplateList: React.FC<I.TemplateProps> = ({
	shouldRedirect = false
}) => {
	const router = useRouter();
	const { listaTemplates, setListaTemplates, activeTemplate, setActiveTemplate } = useTemplateData();
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const fetchedTemplate = await GetTemplates();
                setListaTemplates(fetchedTemplate);
            } catch (error) {
                console.error('Error fetching templates:', error);
            }
        };

        fetchCampaigns();
    }, []);

	const handleSelectTemplate = (template: ITemplate) => {
		setActiveTemplate(template);
    };

	return (
		<S.Container>
			{listaTemplates.map((template) => {
				if (template) {
					return (
						<div
							className={template.name}
							key={template.name}
							onClick={() => handleSelectTemplate(template)}
						>
							<InnerHTML
								html={template.banner}
								width={template.width}
								height={template.height}
								backup={false}
								isSelected={
									activeTemplate?.name === template.name
								}
							/>
						</div>
					);
				}
			})}
		</S.Container>
	);
};

export default TemplateList;
