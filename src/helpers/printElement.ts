
import * as htmlToImage from 'html-to-image';
import imageCompression from 'browser-image-compression';

export async function PrintElement(div: any) {
		const minimumSize = 40000;
    var b64 =  await toImage(div, 1, "png");
		var compressedB64 = b64 as string;
		var size = getBase64Size(compressedB64);
		if (size > minimumSize) {
			for (var i = 10; i > 0; i--) {
			compressedB64 = await Compress(b64, i * 10);
			size = getBase64Size(compressedB64);
			if (size < minimumSize) break;
			}
		}
    return compressedB64;
}

  export async function toImage(div: any, quality: number, type = "jpeg") {
    return new Promise((resolve) => {
      if (type === "jpeg") {
        htmlToImage.toJpeg(div, { quality: quality, pixelRatio: 1 })
        .then(function (dataUrl) {
          resolve(dataUrl);
        });      
      } else if (type === "png") {
        htmlToImage.toPng(div, { quality: 1, pixelRatio: 1 })
        .then(function (dataUrl) {
          resolve(dataUrl);
        });    
      }
    })
  }
  
  export var getBase64Size = function (base64: string) {
    var n = base64.length;
    var last = base64[n - 2];
    var y = 1;
    if (last === "=") y = 2;
    var x = (n * (3/4)) - y;
    return x;
  };
  
  export async function resizedataURL(datas: any, wantedWidth: number, wantedHeight: number) {
    return new Promise((resolve) => {
      var img = document.createElement('img');
      img.onload = function()
        {        
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
    
          canvas.width = wantedWidth;
          canvas.height = wantedHeight;
    
          ctx?.drawImage(this, 0, 0, wantedWidth, wantedHeight);
          resolve(canvas.toDataURL("image/png", 1));
        };
    
      img.src = datas;
    })
  }

  
export async function Compress(background: any, quality: number) {
    var ext = "png";
    try {
      ext = background.split(";base64")[0].replace("data:image/","");
    } catch { }
    var file = await urltoFile(background, 'hello.${ext}',`image/${ext}`);
    var options = {
      initialQuality: quality / 100
    };
    var image = await imageCompression(file, options);
    var b64 = await blobToBase64(image);
    return b64 as string;
  }

  
function urltoFile(url: string, filename: string, mimeType: any){
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename,{type:mimeType});})
    );
  }
  
  function blobToBase64(blob: any) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  export function dataURItoBlob(dataURI: any) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  }