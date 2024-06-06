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
import { b64toBlob, generateFileName, sleep } from '@dynamic/helpers/utils';
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
	const { activeCampaign, campaign, currentPage, setCurrentPage, setPrinting, selectedFormat } = useCampaign();
	const [ loading, setLoading ] = useState({show: false, percentual: "0"});

	const isDownloadAvailable = (): boolean => {
		if (!imagePack && !htmlPack && !videoPack) return false;

		return true;
	};

	const handleDownloadClick = async () => {
		setLoading({show: true, percentual: "0"});
		if (htmlPack) await handleBuildHtml();
		if (imagePack) await handleBuildImage();
		if (videoPack) await handleVideo();
		setImagePack(false);
		setHtmlPack(false);
		setVideoPack(false);
		setLoading({show: false, percentual: "0"});
		setIsOpen(false);
	};

	async function handleBuildHtml() {
		try {
			if (activeCampaign === null) return;
			const formato = campaign[activeCampaign].template?.formats[selectedFormat];
			const fileName = `pack_HTML_${formato.width}x${formato.height}.zip`
			const zip = new JSZip();
			for (var i = 0; i < spreadsheetData.spreadsheetData.length; i++) {
				const creative = buildCreativeLine(formato, spreadsheetData.spreadsheetData[i].elementos, i);
				zip.file(`${campaign[activeCampaign].name}_${formato.width}x${formato.height}_${i + 1}.html`, creative);
			}
			 zip.generateAsync({ type: "blob" })
				 .then(blob => {
					 const url = window.URL.createObjectURL(blob);
					 const link = document.createElement('a');
					 link.href = url;
					 link.download = fileName;
					 document.body.appendChild(link);
					 link.click();
	
					 document.body.removeChild(link);
					 window.URL.revokeObjectURL(url);
				 })
				 .catch(error => {
					 console.error('Erro ao criar arquivo zip:', error);
				 });
		} catch (error) {
			setLoading({show: false, percentual: "0"});
		}
	}

	async function handleBuildImage() {
		try {
			setCurrentPage(1);
			var page = 1;
			setPrinting(true);
			const zip = new JSZip();
			var percentual = "0";
			var items = spreadsheetData.spreadsheetData.length;		
			await sleep(5000);
			for (var i = 0; i < spreadsheetData.spreadsheetData.length; i++) {
				await sleep(1000);
				console.log(i, page * 4);
				percentual = ((i / items) * 100).toFixed(0).toString();
				if (i >= page * 4) {
					page ++;
					setCurrentPage(page);
					setLoading({show: true, percentual: percentual});
					await sleep(5000);
				}
				var div = document.getElementById(`backup-iframe-${i}`);
				var image = await PrintElement(div);
				const blobimage = dataURItoBlob(image);
				zip.file(`${campaign[activeCampaign].name}_${i + 1}.png`, blobimage);
				setLoading({show: true, percentual: percentual});
			}
			setPrinting(false);
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
		} catch (error) {			
			setLoading({show: false, percentual: "0"});
		}
	}

	async function handleVideo() {
		try {
			setLoading({show: true, percentual: "0"});
			var p = 0;
			const zip = new JSZip();
			const formato = campaign[activeCampaign].template.formats[selectedFormat];
			const fileName = `pack_HTML_${formato.width}x${formato.height}.zip`;
			for (var j = 0; j < spreadsheetData.spreadsheetData.length; j++) {
				const htmlText = buildCreativeLine(formato, spreadsheetData.spreadsheetData[j].elementos, j);
				let txt = htmlText.replaceAll("start", "//start");
				txt = htmlText.replaceAll("var count", "//var count");
				var a = txt.split(`<script id="timelineScript">`)[1].split('</script>')[0];
				a = a.replaceAll(" ", "");
				a = a.replaceAll("\n", "");
				a = a.replaceAll("\r", "");
				var b = a.split("][");
				// setLoading({show: false, percentual: "0"});
				// return;
				// var animationScript1 = txt.split(`<script id="animationScript">`);				
				// console.log('animationScript1')
				// console.log(animationScript1)
				// var animationScript2 = animationScript1[1].split('</script>');
				// console.log('animationScript2')
				// console.log(animationScript2)
				// var animationScript = animationScript2[0];				
				// console.log('animationScript')
				// console.log(animationScript)
				// var animations = JSON.parse(animationScript);
				// console.log('txt')
				// console.log(txt)
				// var animation = txt
				// 	.split("count--")[1]
				// 	.split("count++")[0]
				// 	.replaceAll("\n", "")
				// 	.replaceAll("\r", "")
				// 	.replaceAll(" ", "")
				// 	.replaceAll("\"", "")
				// 	.replaceAll("[", "")
				// 	.replaceAll("]", "")
				// 	.replaceAll("(", "")
				// 	.replaceAll("//", "")
				// 	.replaceAll("timeline.animationElements", "");
				// if (animation[0] === ',') animation[0] = '';
				// if (animation[animation.length - 1] === ',') animation[animation.length - 1] = '';
				// console.log('animation')
				// console.log(animation)
				// var timeline = animation.split("),")
				// console.log('timeline')
				// console.log(timeline)
				const delays = [];
				for (var w = 0; w < b.length; w++) {
					var t = b[w].split(",");
					console.log('t')
					console.log(t)
					try {
					var el = {
						animation: t[0].replaceAll("[", "").replaceAll("(", "").replaceAll("vara=","").replaceAll("\"",""),
						name: t[1],
						delay: t[2].replaceAll("\"", "").replaceAll("\'", ""),
						type: t[3].replaceAll(")", "").replaceAll("]","").replaceAll("\"","").replaceAll("\\","")
					}
					console.log('el')
					console.log(el)
					el.name.replaceAll('.', '');
					if (el.name && el.name.toLowerCase() != "banner" && el.name.toLowerCase() != ".banner") delays.push(el)
					} catch { }
				}
				for (var x = delays.length - 1; x >= 0; x--) {            
				for (var y = 0; y < x; y++) {
					delays[x].delay = parseFloat(delays[x].delay) + parseFloat(delays[y].delay);
				}
				}
				// delays.forEach(delay => {
				// 	if (delay.delay[0] === '.') delay.delay = "0" + delay.delay;
				// 	delay.delay = delay.delay * 1000;
				// });
				console.log('delays')
				console.log(delays)
				var html = txt + videoScriptTimeline(delays);
				console.log('html')
				console.log(html)
				const video: VideoModel = {
					html: html,
					duration: 8000,
					fps: 30,
					width: formato.width,
					bitrate: 2000000,
					height: formato.height,
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
					p = (j / spreadsheetData.spreadsheetData.length) * 100 + receberVideo.percentual / spreadsheetData.spreadsheetData.length;
					setLoading({show: true, percentual: p.toFixed(0).toString()})
					if (receberVideo.finalizado) {
						base64.base64 = receberVideo.base64;
						base64.ext = receberVideo.ext;
						// downloadVideo(base64.base64, `300x600-30-1.mp4`);
						const blob = b64toBlob(base64.base64);
						const filename = `${formato.width}_${formato.height}_${j + 1}.mp4`;
						zip.file(filename, blob);
						break;
					}
					}
				}
			}
	
			  zip.generateAsync({ type: "blob" })
				 .then(blob => {
					 const url = window.URL.createObjectURL(blob);
					 const link = document.createElement('a');
					 link.href = url;
					 link.download = `pack_video_${fileName}_${generateFileName()}.zip`;
					 document.body.appendChild(link);
					 link.click();
	
					 document.body.removeChild(link);
					 window.URL.revokeObjectURL(url);
				 })
				 .catch(error => {
					 console.error('Erro ao criar arquivo zip:', error);
				 });
		} catch (error) {	
			console.log('error')		
			console.log(error)		
			setLoading({show: false, percentual: "0"});
		}
	}


	return (
		<S.Container isDownloadAvailable={isDownloadAvailable()} isOpen={isOpen}>
			<div style={{position: 'absolute', width: '100%', height: '100%', background: 'rgba(0, 0, 0,0.7)', left: "0", top: "0",
				display: loading.show ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', zIndex: '10000', flexDirection: 'column'}}>
				<div className="lds-facebook">
				<span style={{color: '#DD1B58', fontSize: '20px', fontWeight: 'bold', position: 'absolute', top: 60, left: 20}}>{loading.percentual}%</span>	
				<div></div><div></div><div></div></div>
				
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
			{/* <div style={{left: '-9999px', position: 'absolute'}}>
				<iframe id="backup-iframe" ref={refBackup}></iframe>
			</div> */}
		</S.Container>
	);
};

export default DownloadModal;
