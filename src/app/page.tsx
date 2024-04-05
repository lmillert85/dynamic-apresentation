'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BtnCustom, HomeWrapper } from './page.style';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineRight } from 'react-icons/ai';
import Steps from '@dynamic/components/steps';
import { useClientData } from '@dynamic/contexts/client';
import { useDynamic } from '@dynamic/contexts/dynamic';

export default function Home() {
	const [btnChoose, setBtnChoose] = useState<'template' | 'custom'>();
	const refInput = useRef(null);
	const refClient = useRef(null);
    const router = useRouter();
	const { clients, setNewCampaign, setActiveClient } = useClientData();
    const handleChangeRoute = () => {
		const name = refClient.current.value;
		const campaign = refInput.current.value;
		if (!name || !btnChoose || !campaign) return;
		const index = clients.findIndex((x: { name: string; }) => x.name === name)
		setNewCampaign({
			name: campaign,
			created: "Luiz Miller Teixeira",
			amount: 0,
			aproved: 0,
			disaproved: 0,
			template: ""
		})
		setActiveClient(clients[index].uuidv);
        // localStorage.clear();
        btnChoose === 'template' && router.push('chooseTemplate');
        btnChoose === 'custom' && router.push('spreadsheet?template=custom');
    };

	return (
		<HomeWrapper>
			<span className="btnNewClient">
				<BtnCustom active={true}>
					<p>Novo cliente </p>
					<FaPlus />
				</BtnCustom>
			</span>

			<div className="content">
				<h1>Bora comecar ?</h1>

				<form onSubmit={event => event.preventDefault()}>
					<label>Selecione o cliente</label>

					<select ref={refClient}>
						<option value="Vivo">Vivo</option>
					</select>

					<input type="text" placeholder="Nome da campanha" ref={refInput} />

					<span className="btnWrapper">
						<BtnCustom
                            type='button'
							active={btnChoose === 'template'}
							onClick={() => setBtnChoose('template')}
						>
							Template basico
						</BtnCustom>
						<p>ou</p>
						<BtnCustom
                            type='button'
							active={btnChoose === 'custom'}
							onClick={() => setBtnChoose('custom')}
						>
							Template personalizado
						</BtnCustom>
					</span>
				</form>

				<button onClick={() => handleChangeRoute()} className="btnAvancar" type='button'>
					Avancar <AiOutlineRight />
				</button>
			</div>
			<div className="steps">
				<Steps activeStep={0}/>
			</div>
		</HomeWrapper>
	);
}
