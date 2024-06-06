import { VideoModel } from '@dynamic/components/downloadModal/interface';
import axios from 'axios'

export async function CriarPasta() {
    try {
        const apiVideo = axios.create({
            baseURL: "https://video.reanimate.com.br/"
            //baseURL: "http://localhost:5000/"
        })
        console.log("Criando pasta no servidor...");
        var pasta =  await apiVideo.get('/Home/criar-pasta');
        return pasta.data;
    } catch { return null; }
}

export async function EnviarHtmlVideo(videoModel: VideoModel, pasta: string) {
    try {
        const apiVideo = axios.create({
            baseURL: "https://video.reanimate.com.br/"
            //baseURL: "http://localhost:5000/"
        })
        const config = {
            timeout: 5000,
            headers: {
                'Access-Control-Allow-Origin': '*',
              },
          };
        const quality = parseInt(25 - (videoModel.quality) / 4);
        var dataAppend = new FormData();
        console.log('videoModel')
        console.log(videoModel)
        dataAppend.append('Html', videoModel.html);
        dataAppend.append('Duration', videoModel.duration.toString());
        dataAppend.append('Fps', videoModel.format.toLowerCase() === 'gif' && videoModel.fps > 50 ? "50" : videoModel.fps.toString());
        dataAppend.append('Width', videoModel.width.toString());
        dataAppend.append('Bitrate', videoModel.bitrate.toString());
        dataAppend.append('Height', videoModel.height.toString());
        dataAppend.append('Format', videoModel.format);
        dataAppend.append('Audio', videoModel.audio);
        dataAppend.append('BitFormat', videoModel.bit ? "yuva444p10le" : "yuv420p");
        dataAppend.append('Path', pasta);
        dataAppend.append('GifQuality', videoModel.gifQuality.toString());
        dataAppend.append('Quality', quality > 25 ? 25 : quality < 1 ? 1 : quality);
        
        console.log('enviando html para a api....')
        apiVideo.post('/Home/video-reanimate', dataAppend, config);
        return null;
    } catch { return null; }
}

export async function ReceberVideo(videoModel: any, pasta: string) {
    var dataAppend = new FormData();
    const apiVideo = axios.create({
        baseURL: "https://video.reanimate.com.br/"
        //baseURL: "http://localhost:5000/"
    })
    dataAppend.append('Duration', videoModel.duration);
    dataAppend.append('Fps', videoModel.fps);
    dataAppend.append('Width', videoModel.width);
    dataAppend.append('Bitrate', videoModel.bitrate);
    dataAppend.append('Height', videoModel.height);
    dataAppend.append('Format', videoModel.format);
    dataAppend.append('Path', pasta);
    const frames = videoModel.fps * videoModel.duration / 1000;
    const config = {
        timeout: 180000,
        headers: {
            'Access-Control-Allow-Origin': '*',
            },
    };
    try {
        var res = await apiVideo.post('/Home/receber-video?tempDirectory=' + pasta, dataAppend, config);
        res.data.percentual = 100 * parseInt(res.data.percentual) / frames;
        res.data.percentual = res.data.percentual < 2 ? 2 : res.data.percentual >= 100 ? 99 : res.data.percentual;
        console.log(res)
        console.log('Porcento: ', res.data.percentual >= 100 ? 99 : res.data.percentual)
        console.log('Finalizado: ', res.data.finalizado)
        console.log('------------------')
        return res.data;
    } catch (error) { 
			console.log('error 5345345')
            console.log(error)
        }
}