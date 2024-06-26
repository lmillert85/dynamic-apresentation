'use client'
import React, { useEffect, useState } from 'react';
import { BsDot } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import Breadcrumb from '@dynamic/components/breadcrumb';
import * as S from './style';
import { GetCampaign, GetClients, GetSheets } from '@dynamic/services/feedService';
import { useParams, useRouter } from 'next/navigation';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';
import { useCampaign } from '@dynamic/contexts/campaign';
import { ICampaign, IFormats } from '@dynamic/services/interface';

const ClientCampaigns = () => {
    const spreadsheetData = useSpreadsheetData();
	const { setSelectedFormat, campaign, handleChangeActiveCampaign, handleChangeCampaign } = useCampaign();
    const router = useRouter();
    const params = useParams();
    const uuidv_client = params.client;
    const client = GetClients(uuidv_client.toString());
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const fetchedCampaigns = await GetCampaign(client.uuidv);
                console.log('fetchedCampaigns')
                console.log(fetchedCampaigns)
                handleChangeCampaign(fetchedCampaigns);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        };

        fetchCampaigns();
    }, []);

    const handleClick = async (uuidv: string, index: number) => {
        try {
            const sheets = await GetSheets(uuidv);
            setSelectedFormat(0);
            spreadsheetData.setSpreadsheetData(sheets.sheets);
            handleChangeActiveCampaign(index);
            router.push('/spreadsheet/' + uuidv)
        } catch (error) {
            console.error('Error fetching sheets:', error);
        }
    };

    const getAproved = (item: ICampaign, type: string) => {
        var amount = 0;
        item.template.formats.forEach((formats: IFormats) => {
            amount += type === 'aproved' ? formats.aproved.length : formats.reproved.length;
        });
        return amount;
    }

    return (
        
        <S.Container>
            <section>
                <h1>Minhas campanhas</h1>
                <div>
                    <p>Filtrar por </p>

                    <select>
                        <option value="ativas">Ativas</option>
                        <option value="inativas">Inativas</option>
                    </select>

                    <span>
                        <input placeholder="Buscar campanhas" />
                        <span className="iconSearch">
                            <FiSearch />
                        </span>
                    </span>
                </div>
            </section>

            <Breadcrumb paths={['Minhas campanhas', client.name]} goto={['/myCampaigns', '/myCampaigns/' + client.name]} />

            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Criador</th>
                        <th>Qtd. pecas</th>
                        <th>Status</th>
                        <th>Formatos</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {campaign.map((item: ICampaign, index: number) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.created}</td>
                            <td>{item.amount * item.template.formats.filter(x => x.active === true).length}</td>
                            <td className="status">
                                {getAproved(item, 'aproved')}
                                <BsDot className="statusGreen" /> {getAproved(item, 'reproved')} <BsDot className="statusRed" />
                            </td>
                            <td>{item.template.formats.filter((x:IFormats) => x.active === true).length}</td>
                            <td className="btnWrapper">
                                <button style={{ cursor: 'pointer' }} onClick={() => handleClick(item.uuidv, index)}>
                                    Acessar
                                </button>
                                <button>Arquivar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </S.Container>
    );
};

export default ClientCampaigns;
