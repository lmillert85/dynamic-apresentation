import { useEffect, useRef } from 'react';
import { Container } from './style';
import * as I from './interface';
import vars from '@dynamic/styles/colors.style';
import { useCampaign } from '@dynamic/contexts/campaign';

const InnerHTML = ({ html, width, height, backup, isSelected = false, index }: I.InnerHTMLProps) => {
	const { printing } = useCampaign();
	const iframeRef = useRef<HTMLIFrameElement>(null);
	if (backup) {
		html = html.replaceAll("animaBanner();", "//animaBanner();");
		html = html.replaceAll("//backup();", "backup();");
	}
	useEffect(() => {

		const iframe = document.createElement('iframe');
		iframe.srcdoc = html.toString();
        iframe.style.width = `${width}px`;
		iframe.style.height = `${height}px`;
		iframe.style.border = 'none';
        iframe.style.pointerEvents = 'none';
        iframe.style.border = isSelected ? `solid 3px ${vars.colors.orange}` : 'none';

		const parser = new DOMParser();
		const dom = parser.parseFromString(html.toString(), 'text/html');
		const scripts = Array.from(dom.querySelectorAll('script'));

		scripts.forEach((script) => {
			const createdScript = document.createElement('script');
			createdScript.textContent = script.textContent;
			iframe.contentDocument?.body.appendChild(createdScript);
		});

        if (iframeRef.current) {
            iframeRef.current.innerHTML = '';
            iframeRef.current.appendChild(iframe);
        }
	}, [html, isSelected]);

	return <Container style={{position: backup ? 'absolute' : 'relative', left: '0', top: '0', zIndex: backup ? 1 : 1}} id={backup ? `backup-iframe-${index}` : ''} key={html} ref={iframeRef} />;
};

export default InnerHTML;
