'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BtnCustom, HomeWrapper } from './page.style';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineRight } from 'react-icons/ai';
import Steps from '@dynamic/components/steps';
import { useClientData } from '@dynamic/contexts/client';
import { GetCampaign, GetClients } from '@dynamic/services/feedService';

export default function Home() {
	const [btnChoose, setBtnChoose] = useState<'template' | 'custom'>();
	const refInput = useRef(null);
	const refClient = useRef(null);
    const router = useRouter();
	const { clients, setNewCampaign, setActiveClient, setClients } = useClientData();
	const [ disabledAvancar, setDisabledAvancar ] = useState(true);
	
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const fetchedClients = await GetClients('asd');
                setClients(fetchedClients);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, []);
	
    const handleChangeRoute = () => {
		const name = refClient.current.value;
		const campaign = refInput.current.value;
		if (!name || !btnChoose || !campaign) return;
		const index = clients.findIndex((x: { name: string; }) => x.name === name);
		setNewCampaign({
			name: campaign,
			client: "Reanimate Demo",
			client_uuidv: "0"
		});
		console.log(clients, index)
		setActiveClient(clients[index]);
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
						{
							clients.map((item: any) => (
								<option value={item.name}>{item.name}</option>
							))
						}
					</select>

					<input type="text" placeholder="Nome da campanha" ref={refInput} onBlur={(evt) => setDisabledAvancar(evt.target.value === '')} />
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

				<button
					onClick={() => handleChangeRoute()}
					className="btnAvancar"
					type='button'					
					disabled={disabledAvancar}
					style={{
						margin: '30px 0 0 0',
						cursor: disabledAvancar ? 'not-allowed' : 'pointer',
						backgroundColor: disabledAvancar ? 'grey' : '',
						opacity: disabledAvancar ? '0.1' : '1'
					}}
					>
					Avancar <AiOutlineRight />
				</button>
			</div>
			<div className="steps">
				<Steps activeStep={0}/>
			</div>
		</HomeWrapper>
	);
}

