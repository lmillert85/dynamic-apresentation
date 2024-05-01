import { useEffect, useRef, useState } from 'react';
import Campaigns from '../campaigns';
import * as I from '../../interface';
import * as S from './style';
import { v4 as uuidv4 } from 'uuid';
import { buildCreativeLine, downloadVideo, videoScriptTimeline } from '@dynamic/helpers/banner';
import { ITemplateElement } from '@dynamic/@types/template.interface';
import { usePreviewEditModalContext } from '@dynamic/contexts/previewEditModal';
import { useTemplateData } from '@dynamic/contexts/template';
import { useCampaign } from '@dynamic/contexts/campaign';
import { Compress, PrintElement, getBase64Size, toImage } from '@dynamic/helpers/printElement';
import { sleep } from '@dynamic/helpers/utils';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';

const PreviewPagination = () => {
	const spreadsheetData = useSpreadsheetData();
	const [allPages, setAllPages] = useState(Math.ceil(spreadsheetData.spreadsheetData.length / 4));
	const [pages, setPages] = useState<Array<JSX.Element>>([]);
	const previewEditModal = usePreviewEditModalContext();
	const { activeCampaign, campaign, handleChangeActiveCampaign, handleChangeCampaign, currentPage, setCurrentPage, selectedFormat, setSelectedFormat } = useCampaign();
	console.log('selectedFormat')
	console.log(selectedFormat)

	const renderPages = () => {
		const helper = [];

		for (let i = 0; i < allPages; i++) {
			helper.push(
				<button
					type="button"
					key={uuidv4()}
					className={i + 1 === currentPage ? 'selectedPage' : ''}
					onClick={() => setCurrentPage(i + 1)}
				>
					{i + 1}
				</button>
			);
		}

		setPages([...helper]);
	};

	const renderPreviews = () => {
		return spreadsheetData.spreadsheetData.map((_, index) => {
			if (activeCampaign === null) return;
			let helper = 4 * (currentPage - 1);
			let divider = helper === 4 ? 5 : 2;
			if (index >= helper && index < helper + 4) {
				return <Campaigns key={uuidv4()} index={index} />;
			}

			return <></>;
		});
	};
	useEffect(() => {
		renderPages();
	}, [currentPage, previewEditModal.isOpen]);

    return (
		<S.Container>
			<section className="previews">{renderPreviews()}</section>
			<div className="pages">{pages.map((page) => page)}</div>
		</S.Container>
	);
};

export default PreviewPagination;
