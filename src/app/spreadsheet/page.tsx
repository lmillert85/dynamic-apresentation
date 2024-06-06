'use client';

import Tabs from '@dynamic/components/tabs';
import { useLayoutEffect, useState } from 'react';
import * as S from './style';
import * as I from '@dynamic/@types/tabSelectedType.interface';
import Spreadsheet from '@dynamic/pages/spreadsheet/components/sheets';
import Template from './components/template';
import SpreadsheetPreview from './components/preview';
import { useSearchParams } from 'next/navigation';
import { useTemplateData } from '@dynamic/contexts/template';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';
import JSZip from 'jszip';
import { buildCreativeLine } from '@dynamic/helpers/banner';
import { useAttachModal } from '@dynamic/contexts/attachModal';
import { useCampaign } from '@dynamic/contexts/campaign';
import InnerHTML from '@dynamic/components/innerHTML';

const SpreadsheetPage = () => {
	// const [tabView, setTabView] =
	// 	useState<I.TabSelectedType['tabSelected']>('sheets');
	// const [isCustomTemplate, setIsCustomTemplate] = useState<boolean>(false);
	// // const [htmlTemplateSelected, setHtmlTemplateSelected] = useState('');
	// const searchParams = useSearchParams();
	// const { listaTemplates, activeTemplate, setActiveTemplate } = useTemplateData();
	// const spreadsheetData = useSpreadsheetData();
	// const { setPage } = useAttachModal();
	// const { activeCampaign, campaign } = useCampaign();
	// const htmlTemplateSelected = campaign[activeCampaign].template.banner;
	
	// const renderViewBasedOnTab = () => {
	// 	switch (tabView) {
	// 		case 'sheets':
	// 			return <Spreadsheet HTMLTemplate={htmlTemplateSelected} />;
	// 		case 'template':
	// 			return (
	// 				<div style={{marginTop: '50px'}}>
	// 					<InnerHTML html={htmlTemplateSelected} width={300} height={600} backup={false} />
	// 				</div>
	// 				// <Template
    //                 //     HTMLTemplate={htmlTemplateSelected}
	// 				// 	template={isCustomTemplate ? 'custom' : 'basic'}
    //                 //     // setHtmlTemplateSelected={setHtmlTemplateSelected}
	// 				// />
	// 			);
	// 		case 'preview':
	// 			return <SpreadsheetPreview HTMLTemplate={htmlTemplateSelected}  />;
	// 		default:
	// 			return <Spreadsheet HTMLTemplate={htmlTemplateSelected} />;
	// 	}
	// };

	// useLayoutEffect(() => {
	// 	const search = searchParams.get('template');

	// 	switch (search) {
	// 		case 'custom':
	// 			setIsCustomTemplate(true);
	// 			setTabView('template');
	// 			break;
	// 		case 'selectedTemplate':
	// 			// setHtmlTemplateSelected(storage);
    //             break;
	// 		default:
	// 			setIsCustomTemplate(false);
	// 	}
	// }, []);

	// useLayoutEffect(() => {
	// 	setPage(tabView);
	// }, [tabView])

	return (
		<></>
		// <S.SpreadsheetContainer>
		// 	<Tabs tabSelected={tabView} setTabView={setTabView} />
		// 	{renderViewBasedOnTab()}
		// 	{/* <Steps activeStep={2} /> */}
		// </S.SpreadsheetContainer>
	);
};

export default SpreadsheetPage;
