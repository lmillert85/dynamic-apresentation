'use client';
import React, { useEffect, useState } from 'react';
import { BsDot } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import Breadcrumb from '@dynamic/components/breadcrumb';
import * as S from './style';
import { GetCampaign, GetSheets } from '@dynamic/services/feedService';
import { ICampaign } from '@dynamic/services/interface';
import { useRouter } from 'next/navigation';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';

const ClientCampaigns = () => {
    const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
    const spreadsheetData = useSpreadsheetData();
    const router = useRouter();	

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const fetchedCampaigns = await GetCampaign('asd');
                setCampaigns(fetchedCampaigns);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        };

        fetchCampaigns();
    }, []);

    const handleClick = async (uuidv: string) => {
        try {
            const sheets = await GetSheets(uuidv);
            spreadsheetData.setSpreadsheetData({ elementos: [], aproved: null });
        } catch (error) {
            console.error('Error fetching sheets:', error);
        }
    };

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

            <Breadcrumb paths={['Minhas campanhas', 'VIVO']} goto={['/myCampaigns', '/myCampaigns/vivo']} />

            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Criador</th>
                        <th>Qtd. pecas</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map((item: ICampaign, index: number) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.created}</td>
                            <td>{item.amount}</td>
                            <td className="status">
                                {item.aproved.length}
                                <BsDot className="statusGreen" /> {item.reproved.length} <BsDot className="statusRed" />
                            </td>
                            <td className="btnWrapper">
                                <button style={{ cursor: 'pointer' }} onClick={() => handleClick(item.uuidv)}>
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
