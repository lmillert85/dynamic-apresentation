import { Dispatch, SetStateAction, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ContainerDropzone } from './style';
import HtmlTag from '../../../../../../public/htmlTag.png';
import { useSetterHTMLTemplateOnLocale } from '@dynamic/hooks/localStorage';

const Dropzone = ({
	setHtml
}: {
	setHtml: Dispatch<SetStateAction<string>>;
}) => {
	const setTemplate = useSetterHTMLTemplateOnLocale;

	const onDrop = useCallback(async (files: File[]) => {
		const file = files[0];

		const fileProcessed: string = await new Promise((resolve) => {
			const fileReader = new FileReader();

			fileReader.onload = () =>
				resolve(fileReader.result?.toString() ?? '');

			fileReader.readAsText(file);
		});

		setTemplate(fileProcessed);
		setHtml(fileProcessed);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			'text/html': ['.html', '.htm']
		}
	});

	return (
		<ContainerDropzone>
			<h1>Suba seu template !</h1>

			<p>
				Arraste e solte o arquivo HTML aqui ou clique <br />
				para fazer o upload do arquivo
			</p>

			<div className="dropzone-box" {...getRootProps()}>
				<input {...getInputProps()} accept="" />
				<span>
					<img src={HtmlTag.src} className="htmltag" />
					<div className="circle-dotted"></div>
				</span>
			</div>
		</ContainerDropzone>
	);
};

export default Dropzone;
