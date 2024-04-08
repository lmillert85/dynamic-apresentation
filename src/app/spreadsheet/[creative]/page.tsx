'use client';

import * as S from './style';
import React, { useRef, useState } from 'react';
import { GetCampaign, GetSheets } from '@dynamic/services/feedService';
import { useRouter } from 'next/navigation';
import { Column, ContextMenuItem, DataSheetGrid, DataSheetGridRef, DynamicDataSheetGrid, createContextMenuComponent, keyColumn } from 'react-datasheet-grid';
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

function Creative (uuidv: string) {
	const { campaign, activeCampaign, handleChangeActiveCampaign, handleChangeCampaign } = useCampaign();
    console.log('campaign')
    console.log(campaign)
    console.log('activeCampaign')
    console.log(activeCampaign)
	const [tabView, setTabView] =
		useState<IT.TabSelectedType['tabSelected']>('sheets');

    const html = activeCampaign === null ? "" : campaign[activeCampaign].template?.banner;
	
    
	return (
		<S.Container>
			<Tabs tabSelected={tabView} setTabView={setTabView} />
            {
                tabView === 'sheets' ?
                    <Spreadsheet/> :
                tabView === 'preview' ?
                    <SpreadsheetPreview/> :
                tabView === 'template' ?
                    <div style={{marginTop: '50px'}}>
                        <InnerHTML html={html} width={300} height={600} backup={false} />
                    </div> :
                <></>
            }
		</S.Container>
	);
};

export default Creative;
