import { useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Switch } from '@mui/material';
import { saveAs } from 'file-saver';
import { v4 } from 'uuid';
import JSZip from 'jszip';
import { useDownloadModalContext } from '@dynamic/contexts/downloadModal';
import * as S from './style';
import { useCampaign } from '@dynamic/contexts/campaign';
import { buildCreativeLine, downloadVideo, videoScriptTimeline } from '@dynamic/helpers/banner';
import { sleep } from '@dynamic/helpers/utils';
import { PrintElement, dataURItoBlob } from '@dynamic/helpers/printElement';
import { CriarPasta, EnviarHtmlVideo, ReceberVideo } from '@dynamic/services/videoService';
import { VideoModel } from './interface';
import { useDynamic } from '@dynamic/contexts/dynamic';
// import Loading from '../loading';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';

const DownloadModal = () => {
	const [imagePack, setImagePack] = useState(false);
	const [htmlPack, setHtmlPack] = useState(false);
	const [videoPack, setVideoPack] = useState(false);
    const { isOpen, setIsOpen } = useDownloadModalContext();
	const spreadsheetData = useSpreadsheetData();
    const zip = new JSZip();
	const { activeCampaign, campaign, handleChangeCampaign } = useCampaign();
	const refBackup = useRef<HTMLIFrameElement>(null);
	const [ loading, setLoading ] = useState(false);

	const isDownloadAvailable = (): boolean => {
		if (!imagePack && !htmlPack && !videoPack) return false;

		return true;
	};

	const handleDownloadClick = async () => {
		setLoading(true);
		if (htmlPack) await handleBuildHtml();
		if (imagePack) await handleBuildImage();
		if (videoPack) await handleVideo();
		setImagePack(false);
		setHtmlPack(false);
		setVideoPack(false);
		setLoading(false);
		setIsOpen(false);
	};

	async function handleBuildHtml() {
		 if (activeCampaign === null) return;
		const zip = new JSZip();
		for (var i = 0; i < spreadsheetData.spreadsheetData.length; i++) {
			var creative = buildCreativeLine(campaign[activeCampaign].template.template, spreadsheetData.spreadsheetData[i].elementos , i);
			zip.file(`${campaign[activeCampaign].name}_${i}.html`, creative);
		}
		 zip.generateAsync({ type: "blob" })
             .then(blob => {
                 const url = window.URL.createObjectURL(blob);
                 const link = document.createElement('a');
                 link.href = url;
                 link.download = "pack HTML.zip";
                 document.body.appendChild(link);
                 link.click();

                 document.body.removeChild(link);
                 window.URL.revokeObjectURL(url);
             })
             .catch(error => {
                 console.error('Erro ao criar arquivo zip:', error);
             });
	}

	async function handleBuildImage() {
		const zip = new JSZip();
		refBackup.current.left = "-2000px";
		refBackup.current.opacity = "1";
		console.log('campaign')
		console.log(campaign)
		for (var i = 0; i < spreadsheetData.spreadsheetData.length; i++) {
			// for (var i = 0; i < campaign[activeCampaign].creative.length; i++) {
			var html = buildCreativeLine(campaign[activeCampaign].template.template, spreadsheetData.spreadsheetData[i].elementos , i);
			html = html.replaceAll("animaBanner();", "//animaBanner();");
			html = html.replaceAll("//backup();", "backup();");
			refBackup.current.srcdoc = html.toString();
			// refBackup.current?.src = html.toString();
			refBackup.current.width = `${campaign[activeCampaign].template.width}px`;
			refBackup.current.height = `${campaign[activeCampaign].template.height}px`;
			refBackup.current.border = 'none';
			// refBackup.current.style.pointerEvents = 'none';
			// refBackup.current.style.border = 'none';
			await sleep(1000);
			var div = document.getElementById('backup-iframe');
			var image = await PrintElement(div);
  			const blobimage = dataURItoBlob(image);
			zip.file(`${campaign[activeCampaign].name}_${i}.png`, blobimage);
		}
		refBackup.current.srcdoc = "";
		refBackup.current.zIndex = "-9999";
		refBackup.current.opacity = "0";
		refBackup.current.left = "-2000px";
		zip.generateAsync({ type: "blob" })
             .then(blob => {
                 const url = window.URL.createObjectURL(blob);
                 const link = document.createElement('a');
                 link.href = url;
                 link.download = "pack imagens.zip";
                 document.body.appendChild(link);
                 link.click();

                 document.body.removeChild(link);
                 window.URL.revokeObjectURL(url);
             })
             .catch(error => {
                 console.error('Erro ao criar arquivo zip:', error);
             });
	}

	async function handleVideo() {
		var htmlText = activeCampaign !== null ? buildCreativeLine(campaign[activeCampaign], 0) : "";
		
		let txt = htmlText.replaceAll("animabanner()", "//animabanner()");
		txt = txt.replaceAll("backup();", "//backup();");
		txt = txt.replaceAll("function //animabanner() {", "function animabanner() {");
		txt = txt.replaceAll("function //animabanner(){", "function animabanner() {");
		txt = txt.replaceAll("function //animabanner()", "function animabanner()");
		txt = txt.replaceAll("function  //animabanner()", "function animabanner()");
		var animation = txt
            .split("//#TIMELINE#")[1]
			.split("//#TIMELINE_FIM#")[0]
            .replaceAll("\n", "")
            .replaceAll("\r", "")
            .replaceAll(" ", "")
            .replaceAll("\"", "")
            .replaceAll("[", "")
            .replaceAll("]", "")
            .replaceAll("(", "")
            .replaceAll("//", "")
            .replaceAll("timeline.animationElements", "");
		var timeline = animation.split(");")
		const delays = [];
		for (var w = 0; w < timeline.length; w++) {
			var t = timeline[w].split(",");
			try {
			var el = {
				name: t[1].replaceAll(" ", "").replace(".", "").replaceAll("\"", ""),
				animation: t[0].replaceAll(" ", ""),
				delay: t[2].replaceAll(" ", "").replaceAll("\"", ""),
				type: t[3].replaceAll(" ", "").replaceAll("\"", "")
			}
			if (el.name && el.name.toLowerCase() != "banner") delays.push(el)
			} catch { }
		}
		for (var x = delays.length - 1; x >= 0; x--) {            
		  for (var y = 0; y < x; y++) {
		    delays[x].delay = parseFloat(delays[x].delay) + parseFloat(delays[y].delay);
		  }
		}
		delays.forEach(delay => {
			delay.delay = delay.delay * 1000;
		});
		var html = txt + videoScriptTimeline(delays)
		
		const video: VideoModel = {
			html: html,
			duration: 5300,
			fps: 30,
			width: 300,
			bitrate: 2000000,
			height: 600,
			format: "mp4",
			quality: 100,
			audio: "",
			loop: false,
			bit: false,
			gifQuality: false
		  };

		var base64 = { base64: "", ext: "" };
		var pastaServidor = await CriarPasta();
		var enviarHtml = await EnviarHtmlVideo(video, pastaServidor);
		if (enviarHtml) {
			base64.base64 = enviarHtml.data.base64;
			base64.ext = enviarHtml.data.ext;
		  } else {
			for (var i = 0; i < 360; i++) {
			  await sleep(10000);
			  var receberVideo = await ReceberVideo(video, pastaServidor);
			  if (receberVideo.finalizado) {
				base64.base64 = receberVideo.base64;
				base64.ext = receberVideo.ext;
				console.log('base64')
				console.log(base64)
				downloadVideo(base64.base64, `300x600-30-1.mp4`);
				break;
			  }
			}
		  }
	}


	return (
		<S.Container isDownloadAvailable={isDownloadAvailable()} isOpen={isOpen}>
			<div style={{position: 'absolute', width: '100%', height: '100%', background: 'rgba(0, 0, 0,0.7)', left: 0, top: 0,
				display: loading ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', zIndex: '10000', flexDirection: 'column'}}>
				<div className="lds-facebook"><div></div><div></div><div></div></div>
			</div>
			<div>
				<IoClose className="closeIcon" onClick={() => setIsOpen(false)} />
				<h1>Download</h1>

				<section>
					<label>
						<span>Pack de imagem </span>
						<Switch
							checked={imagePack}
							onChange={() => setImagePack(!imagePack)}
						/>
					</label>

					<label>
						<span>Pack de html </span>
						<Switch
							checked={htmlPack}
							onChange={() => setHtmlPack(!htmlPack)}
						/>
					</label>

					<label>
						<span>Pack de video </span>
						<Switch
							checked={videoPack}
							onChange={() => setVideoPack(!videoPack)}
						/>
					</label>
				</section>

				<button type="button" onClick={() => handleDownloadClick()}>
					Baixar
				</button>
			</div>
			<div style={{left: '-9999px', position: 'absolute'}}>
				<iframe id="backup-iframe" ref={refBackup}></iframe>
			</div>
		</S.Container>
	);
};

export default DownloadModal;