import * as S from './style';
import * as I from './interface';
import Dropzone from './dropzone';
import InnerHTML from '@dynamic/components/innerHTML';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const Template: React.FC<I.SpreadsheetTemplateTypes> = ({
	template,
	HTMLTemplate,
	// setHtmlTemplateSelected
}) => {
	const [queryParam, setQueryParam] = useState('');
	const searchParams = useSearchParams();
	useEffect(() => {
		setQueryParam(searchParams.get('template') ?? 'custom');
		// setHtmlTemplateSelected(locale);
	}, []);

	const handleResetTemplate = (): void => {
			// setHtmlTemplateSelected('');
			// setLocale('');
	};
	return template === 'custom' && !HTMLTemplate.length ? (
		// <Dropzone setHtml={setHtmlTemplateSelected} />
		<></>
	) : (
		<S.Container>
			{/* {queryParam === 'custom' ? (
				<button type="button" onClick={() => handleResetTemplate()}>
					Atualizar template
				</button>
			) : (
				<></>
			)} */}
			{/* <InnerHTML
				html={HTMLTemplate}
				width={Number.parseInt(templateWidth)}
				height={Number.parseInt(templateHeight)}
				backup={false}
			/> */}
		</S.Container>
	);
};

export default Template;
