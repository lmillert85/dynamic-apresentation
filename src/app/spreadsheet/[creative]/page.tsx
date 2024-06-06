'use client';

import * as S from './style';
import React, { useRef, useState } from 'react';
import 'react-datasheet-grid/dist/style.css';
import Tabs from '@dynamic/components/tabs';
import * as IT from '@dynamic/@types/tabSelectedType.interface';
import Spreadsheet from '../components/sheets';
import SpreadsheetPreview from '../components/preview';
import { useCampaign } from '@dynamic/contexts/campaign';
import { IFormats } from '@dynamic/services/interface';
import InnerHTML from '@dynamic/components/innerHTML';

function Creative (uuidv: string) {
	const { campaign, activeCampaign, selectedFormat, setSelectedFormat } = useCampaign();
	const [tabView, setTabView] =
		useState<IT.TabSelectedType['tabSelected']>('sheets');
	return (
		<S.Container>
			<Tabs tabSelected={tabView} setTabView={setTabView} tabFormatSelected={null} />
            <div style={{display: 'flex', position: 'absolute', top: 39, left: 498}}>
                {
                    tabView === 'preview' ?
                    activeCampaign === null ? <></> :
                    campaign[activeCampaign].template?.formats.map((item: IFormats, index: number) => (
                        item.active ?
                        <div style={{
                            background: selectedFormat === index ? '#ff9e53' : 'white',
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
                    <div style={{marginTop: '50px', display: 'flex', justifyContent: 'center'}}>
                        {campaign[activeCampaign].template.formats.map((t: IFormats) => (
                            t.active ?
                                <InnerHTML html={t.html} width={t.width} height={t.height} backup={false} />
                                :
                                <></>
                        ))}
                    </div> :
                <></>
            }
		</S.Container>
	);
};

export default Creative;
