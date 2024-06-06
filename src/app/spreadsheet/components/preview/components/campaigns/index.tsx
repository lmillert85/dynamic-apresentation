import { ChangeEvent, useEffect, useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import InnerHTML from '@dynamic/components/innerHTML';
import * as S from './style';
import * as I from './interface';
import { usePreviewEditModalContext } from '@dynamic/contexts/previewEditModal';
import { useAttachModal } from '@dynamic/contexts/attachModal';
import { useTemplateData } from '@dynamic/contexts/template';
import { buildCreativeLine } from '@dynamic/helpers/banner';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';
import { useCampaign } from '@dynamic/contexts/campaign';
import { Compress, getBase64Size, toImage } from '@dynamic/helpers/printElement';
import { PostAproved } from '@dynamic/services/feedService';
import { ICampaign } from '@dynamic/services/interface';

const Campaigns: React.FC<I.CampaignProps> = ({ index }) => {
	const [review, setReview] = useState<I.reviewType>('InAnalysis');
	const previewEditModal = usePreviewEditModalContext();
	const { setIsOpen, setRow, row } = useAttachModal();
	const spreadsheetData = useSpreadsheetData();
	const { activeCampaign, campaign, handleChangeCampaign, selectedFormat, setSelectedFormat } = useCampaign();
	const html = activeCampaign !== null ? buildCreativeLine(campaign[activeCampaign].template.formats[selectedFormat], spreadsheetData.spreadsheetData[index].elementos, index) : "";
	
	const handleReviewCampaign = async (index: number, rev: I.reviewType) => {
		if (activeCampaign === null) return;
		var copyCampaign = JSON.parse(JSON.stringify(campaign));
		console.log('copyCampaign')
		console.log(copyCampaign)
		console.log('spreadsheetData.spreadsheetData[0]')
		console.log(spreadsheetData.spreadsheetData[0])
		var uuidv_campaign = JSON.parse(JSON.stringify(spreadsheetData.spreadsheetData[0].uuidv_campaign))
		console.log('uuidv_campaign')
		console.log(uuidv_campaign)
		const _campaign = copyCampaign.findIndex((x: ICampaign) => x.uuidv === uuidv_campaign);
		console.log('_campaign')
		console.log(_campaign)
		var c = copyCampaign[_campaign].template.formats[selectedFormat];
		console.log('c')
		console.log(c)
		var indexAproved : number = c.aproved.findIndex((x: number) => x === index);
		var indexReproved : number = c.reproved.findIndex((x: number) => x === index);

		if (rev === 'Approved') {
			if (indexAproved === -1) c.aproved.push(index)
			else c.aproved.splice(indexAproved, 1);
			if (indexReproved !== -1) c.reproved.splice(indexReproved, 1);
			await PostAproved(c.aproved, rev, uuidv_campaign, selectedFormat);

		} if (rev === 'Reproved') {
			if (indexReproved === -1) c.reproved.push(index)
			else c.reproved.splice(indexReproved, 1);
			if (indexAproved !== -1) c.aproved.splice(indexAproved, 1);
			await PostAproved(c.reproved, rev, uuidv_campaign, selectedFormat);
		}
		handleChangeCampaign(copyCampaign);
	};	

	const handleEditButtonClick = (): void => {
		previewEditModal.setIndex(index);
		previewEditModal.setIsOpen(true);
		setRow(index);
		setIsOpen(false);
	};

	function handleFindStatus(index: number, rev: string) {
		if (activeCampaign === null) return false;
		if (rev === 'Approved') {
			var i : number = campaign[activeCampaign].template?.formats[selectedFormat].aproved.findIndex((x: number) => x === index);
			return i !== -1;
		} else if (rev === 'Reproved') {
			var i : number = campaign[activeCampaign].template?.formats[selectedFormat].reproved.findIndex((x: number) => x === index);
			return i !== -1;
		}
		return true;
	}

	return (
		<S.Container review={review}>
			<section>
				<p>Linha {index + 1}</p>

				<span className="controls">
					<AiOutlineCheckCircle
						style={{backgroundColor: handleFindStatus(index, 'Approved') ? 'green' : 'white'}}
						onClick={() => handleReviewCampaign(index, 'Approved')}
						className="btnCheck"
					/>
					<AiOutlineCloseCircle
						style={{backgroundColor: handleFindStatus(index, 'Reproved') ? 'red' : 'white'}}
						onClick={() => handleReviewCampaign(index, 'Reproved')}
						className="btnWrong"
					/>
				</span>
			</section>
			<InnerHTML html={html} width={campaign[activeCampaign].template.formats[selectedFormat].width} height={campaign[activeCampaign].template.formats[selectedFormat].height} backup={false} />
			<InnerHTML html={html} width={campaign[activeCampaign].template.formats[selectedFormat].width} height={campaign[activeCampaign].template.formats[selectedFormat].height} backup={true} index={index} fonts={campaign[activeCampaign].template.font}/>

			<button type="button" onClick={() => handleEditButtonClick()}>
				Editar
			</button>
		</S.Container>
	);
};

export default Campaigns;
