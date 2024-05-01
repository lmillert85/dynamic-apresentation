'use client';

import * as S from './style';
import React, { useRef, useState } from 'react';
import { GetCampaign, GetSheets } from '@dynamic/services/feedService';
import { useRouter } from 'next/navigation';
// import { ReturnColumnType } from '../components/sheets/helper/columnType';
import { internationalizationContextMenu } from '../components/sheets/helper/internationalization';
import { ContainerSpreadsheet } from '../components/sheets/style';
import ControlButtons from '../components/sheets/components/controlButtons';
import MainSelectedCell from '../components/sheets/components/mainSelectedCell';
import * as I from '../components/sheets/interface';
import 'react-datasheet-grid/dist/style.css';
import { ReturnColumnType } from '../components/sheets/helper/columnType';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';
import Tabs from '@dynamic/components/tabs';
import * as IT from '@dynamic/@types/tabSelectedType.interface';
import Spreadsheet from '../components/sheets';
import InnerHTML from '@dynamic/components/innerHTML';
import SpreadsheetPreview from '../components/preview';
import { useCampaign } from '@dynamic/contexts/campaign';
import { IFormats } from '@dynamic/services/interface';

function Creative (uuidv: string) {
	const { campaign, activeCampaign, selectedFormat, setSelectedFormat } = useCampaign();
	const [tabView, setTabView] =
		useState<IT.TabSelectedType['tabSelected']>('sheets');
    const html = activeCampaign === null ? "" : campaign[activeCampaign].template?.banner;
	    console.log('campaign[activeCampaign].template Creative')
	    console.log(campaign[activeCampaign].template)
	return (
		<S.Container>
			<Tabs tabSelected={tabView} setTabView={setTabView} />
            <div style={{display: 'flex', position: 'absolute', top: 39, left: 498}}>
                {
                    tabView === 'preview' ?
                    campaign[activeCampaign].template.formats.map((item: IFormats, index: number) => (
                        item.active ?
                        <div style={{
                            background: selectedFormat === index ? '#DD1B58' : 'white',
                            color: selectedFormat === index ? '#f7f7f7' : '#7d7d7d',
                            cursor: 'pointer',
                            width: '150px',
                            border: 'solid 1px #7d7d7d',
                            borderRadius: '10px 10px 0 0',
                            height: '40px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transition: 'background 500ms, color 1000ms'
                            }}
                            onClick={() => setSelectedFormat(index)}
                        >
                        {item.width}x{item.height}
                    </div> : <></>
                    )) : <></>
                }
            </div>
            {
                tabView === 'sheets' ?
                    <Spreadsheet/> :
                tabView === 'preview' ?
                    <SpreadsheetPreview/>:
                tabView === 'template' ?
                    <div style={{marginTop: '50px'}}>
                        {/* <InnerHTML html={html} width={300} height={100} backup={false} /> */}
                    </div> :
                <></>
            }
		</S.Container>
	);
};

export default Creative;
