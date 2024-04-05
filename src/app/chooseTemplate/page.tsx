'use client';

import Steps from '@dynamic/components/steps';
import * as S from './style';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useState } from 'react';
import TemplateList from '@dynamic/components/templateList';
import { chooseTemplateProps } from '@dynamic/@types/chooseTemplate.interface';
import { useTemplateData } from '@dynamic/contexts/template';
import { useClientData } from '@dynamic/contexts/client';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';
import { useCampaign } from '@dynamic/contexts/campaign';
import { useRouter } from 'next/navigation';
const ChooseTemplate = (): JSX.Element => {
	const [selectedTemplate, setSelectedTemplate] =
		useState<chooseTemplateProps>({
			name: '',
			template: ''
		});
	const router = useRouter();
	const { clients, setClients, newCampaign, setNewCampaign, activeClient, setActiveClient } = useClientData();
	const { listaTemplates, activeTemplate, setActiveTemplate } = useTemplateData();
	const spreadsheetData = useSpreadsheetData();
	const { activeCampaign, campaign, handleChangeActiveCampaign } = useCampaign();

	const handleTemplateChoosed = (): void => {
		handleChangeActiveCampaign(0);
		// spreadsheetData.handleChangeSpreadsheetData([...campaign[0].creative]);
		router.push('/spreadsheet?template=selectedTemplate')
    };

	return (
		<S.ContainerChooseTemplate>
			<div className='row'>
				<h1>Escolha seu template !</h1>

				<span>
					<p>Filtrar por </p>

					<select>
						<option value="Basicos">Basicos</option>
					</select>
				</span>
			</div>

			<TemplateList
				selectedTemplate={selectedTemplate}
				setSelectedTemplate={setSelectedTemplate}
				shouldRedirect={false}
			/>

			<div className="template-list">
				<button
					type="button"
					className="btnNext"
					onClick={() => router.back()}
				>
					Voltar <AiOutlineLeft />
				</button>

				{
					activeTemplate ?
					<button
						type="button"
						className="btnNext"
						onClick={() => handleTemplateChoosed()}
					>
						Avanco <AiOutlineRight />
					</button> : <></>
				}
			</div>

			<div className="steps">
				<Steps activeStep={1} />
			</div>
		</S.ContainerChooseTemplate>
	);
};

export default ChooseTemplate;
