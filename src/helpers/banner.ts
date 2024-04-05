import {
	ITemplate,
	ITemplateElement
} from '@dynamic/@types/template.interface';
import { generateRandomString } from './utils';

export function getElementsTemplate(banner: string): ITemplate | null {
	try {
		if (banner) {
			const regex = /<script id="dynamicScript">([\s\S]*?)<\/script>/;
			const elementos = regex
				.exec(banner)![0]
				.replaceAll('var json = ', '')
				.replaceAll('<script id="dynamicScript">', '')
				.replaceAll('</script>', '');

			const json = JSON.parse(elementos);

			return {
				// name: generateRandomString(),
				// banner: banner,
				// width: json.width,
				// height: json.height,
				elementos: json.elementos,
				aproved: false
				// template: replaceBG(banner) ?? ''
			};
		}
		return null;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export function replaceBG(banner: string): string | null {
	try {
		let matches = true;
		while (matches) {
			let regex = /background: url\(data:(.*?)\) no-repeat;/g;
			matches = !!banner.match(regex);
			banner = banner.replace(regex, '');
		}

		banner = banner.replaceAll('/*backgroundDynamic:', 'background:');
		banner = banner.replaceAll('#*/', '#;');

		return banner;
	} catch {
		return null;
	}
}

export function buildCreativeLine(templateHTML: any, creative: any, index: number) {
	 var template = templateHTML.replaceAll("</html>", "<script>\n");
	 template += `
	 	function build() {
	 		var divs = banner.querySelectorAll('*');
	 		const elementos = [];

	 `;
	 creative.forEach((el: any) => {
	  	if (el.tipo === 'b64') {
	  		if (el?.value[0] === '#') {
	  			template = template?.replaceAll(el.key, `''`);
	  		} else {
	  			template = template?.replaceAll(el.key, `url('${el.value}') no-repeat;`);
	  		}
	  	} else if (el.tipo === 'text') {
	  		template += `
	  			elementos.push({id: '${el.id}', value: '${el.value}'});
	  		`
	  	}
	  });
	  template += `
	  		for(var i = 0; i < divs.length; i++) {
	  			for(var j = 0; j < elementos.length; j++) {
	  			 if(divs[i].id === elementos[j].id) {
	  				divs[i].innerHTML = elementos[j].value;
	  			 	}
	  			}
	  		}
	  	}
	  	setTimeout(build, 0);
	  `
	  template += "</script>\n</html>";
	  template = template.replaceAll("'') no-repeat;;", "') no-repeat;");
	return template;
}

export function videoScriptTimeline(delays: any) {
	var script = `<script type="text/javascript">
	var time = 0;
	function setTime(t) {
		time += t;
	  const ids = [`
  
	delays.forEach((delay: any) => {
	  script += `{\nid: "${delay.name}",\ndelay: ${delay.delay},\nanimation: "${delay.animation}",\ntype: "${delay.type}",\nopacity: ${delay.type !== 'OUT'}\n}\n,\n`
	});
  
	script += `]
	ids.forEach((id, index) => {
		try {        
		  let delay = id.delay - time;
		  let css = document.getElementsByClassName(id.id)[0];
		  css.style['animationPlayState'] = 'paused'
		  if (delay > 0) {
			css.style.opacity = 0;
		  } else {
			try {
			  if (id.type === "OUT" && !id.opacity) {
				id.opacity = true;
				css.style.opacity = 1;
			  }
			} catch {}
			css.style.animationDelay = delay + 'ms';
			css.className = id.id + " " + id.animation;
		  }
		} catch {}
	  });
	}
	setTime(0)
  </script>`
  return script;
  }

export function downloadVideo(base64Data:string, filename: string) {
	const blob = b64toBlob(base64Data);
	const url = URL.createObjectURL(blob);
  
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	link.click();
  
	URL.revokeObjectURL(url);
  }

  
function b64toBlob(base64Data:string) {
	const byteCharacters = atob(base64Data);
	const byteNumbers = new Array(byteCharacters.length);
	for (let i = 0; i < byteCharacters.length; i++) {
	byteNumbers[i] = byteCharacters.charCodeAt(i);
	}
	const byteArray = new Uint8Array(byteNumbers);
	return new Blob([byteArray]);
}