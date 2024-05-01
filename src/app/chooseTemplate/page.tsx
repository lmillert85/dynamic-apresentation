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
import { IFormats } from '@dynamic/services/interface';
import { PostCampaign } from '@dynamic/services/feedService';
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
	const { activeCampaign, campaign, handleChangeCampaign } = useCampaign();
	const [ modal, setModal ] = useState<boolean>(false);
	const [ disabledAvancar, setDisabledAvancar ] = useState(false);

	const handleTemplateChoosed = (): void => {
		setModal(true);
    };

	const handleChangeFormat = (index: number): void => {
		if (activeTemplate) {
			activeTemplate.formats[index].active = !activeTemplate.formats[index].active;			
			var index = activeTemplate.formats.findIndex((x: { active: boolean; }) => x.active === true);
			setDisabledAvancar(index === -1);
		}
	}

	const handleClick = async () : Promise<void> => {
		if (activeTemplate) {
			await PostCampaign(
				{
					uuidv: "1e0d824c-5049-456b-a9df",
					client: activeClient.name,
					name: newCampaign.name,
					aproved: [],
					reproved: [],
					created: "Reanimate Demo",
					template: activeTemplate,
					amount: 1,
					id: null,
					formats: []
				}
			)
			router.push('/myCampaigns/1e0d824c-5049-456b-a9df')
		}
	}

	return (
		<S.ContainerChooseTemplate>
			{
				modal ?
				<div style={{position: 'absolute', width: '100vw', height: '100vh', top: 0, left: 0, background: 'rgba(0, 0, 0, 0.6)', zIndex: 9999, justifyContent: 'center',
				alignItems: 'center', display: 'flex'}}>
					<div style={{display: 'flex', width: '300px', flexDirection: 'column', background: 'white', border: '1px solid black', borderRadius: '5px', padding: '30px', position: 'relative'}}>
						<span style={{position: 'absolute', right: 20, top: 10, fontWeight: 'bold', cursor: 'pointer'}} onClick={() => setModal(false)}>X</span>
						<span style={{textAlign: 'center', fontWeight: 'bold', fontSize: '23px'}}>Escolha os formatos</span>
						<div style={{padding: '30px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
							{
								activeTemplate?.formats.map((item: IFormats, index: number) => (
									<div style={{display: 'flex', flexDirection: 'row', marginBottom: '10px'}}>
										<input onChange={() => handleChangeFormat(index)} defaultChecked={item.active} type='checkbox'></input>
										<span>{item.width}x{item.height}</span>
									</div>
								))
							}
							<div className="template-list">
								<button
									disabled={disabledAvancar}
									style={{
										margin: '30px 0 0 0',
										cursor: disabledAvancar ? 'not-allowed' : 'pointer',
										backgroundColor: disabledAvancar ? 'grey' : '',
										opacity: disabledAvancar ? '0.1' : '1'
									}}
									type="button"
									className="btnNext"
									onClick={() => handleClick()}
								>
									Avançar <AiOutlineRight />
								</button>
							</div>
						</div>
					</div>
				</div>
				: <></>
			}
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
