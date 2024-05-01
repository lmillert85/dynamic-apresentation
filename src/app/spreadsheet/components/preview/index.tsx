import { useState } from 'react';
import * as S from './style';
import * as I from './interface';
import { HiDownload } from 'react-icons/hi';
import { RiExpandUpDownLine } from 'react-icons/ri';
import { PiSlideshowLight, PiBracketsAngle } from 'react-icons/pi';
import PreviewPagination from './components/pagination';
import ScrollView from './components/scrollView';
import SlidePreview from './components/slide';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';
import { useDownloadModalContext } from '@dynamic/contexts/downloadModal';
import { useCampaign } from '@dynamic/contexts/campaign';
import { IFormats } from '@dynamic/services/interface';

const SpreadsheetPreview = () => {
	const { activeCampaign, campaign, handleChangeCampaign } = useCampaign();
	const [viewType, setViewType] =
		useState<I.SpreadsheetPreviewTypes['viewType']>('pages');
	const spreadsheet = useSpreadsheetData();
	const [renderPreviewCampaignType, setRenderPreviewCampaignType] = useState(
		<PreviewPagination/>
	);
	const DownloadModalContext = useDownloadModalContext();
	const handleChangeView = (type: I.SpreadsheetPreviewTypes['viewType']) => {
		setViewType(type);

		switch (type) {
			case 'pages':
				setRenderPreviewCampaignType(
					<PreviewPagination/>
				);
				break;
			case 'infiniteScroll':
				setRenderPreviewCampaignType(
					<ScrollView data={spreadsheet.spreadsheetData} />
				);
				break;
			case 'slide':
				setRenderPreviewCampaignType(
					<SlidePreview data={spreadsheet.spreadsheetData} />
				);
				break;
			default:
				break;
		}
	};

	return (
		<S.ContainerPreview viewType={viewType}>
			<section>
				<div className="viewControls">
					{/* <PiBracketsAngle
						id="pages"
						onClick={() => handleChangeView('pages')}
					/>
					<PiSlideshowLight
						id="slide"
						onClick={() => handleChangeView('slide')}
					/>
					<RiExpandUpDownLine
						id="infiniteScroll"
						onClick={() => handleChangeView('infiniteScroll')}
					/> */}
				</div>

				<button
					type="button"
					onClick={() => DownloadModalContext.setIsOpen(true)}
				>
					Download <HiDownload className="downloadIcon" />
				</button>
			</section>

			<div className="campaigns">{renderPreviewCampaignType}</div>
		</S.ContainerPreview>
	);
};

export default SpreadsheetPreview;
