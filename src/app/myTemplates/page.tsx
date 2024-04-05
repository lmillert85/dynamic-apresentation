'use client';

import * as S from './style';
import TemplateList from '@dynamic/components/templateList';
import { useState } from 'react';
import { chooseTemplateProps } from '@dynamic/@types/chooseTemplate.interface';

const MyTemplate = () => {
	const [selectedTemplate, setSelectedTemplate] =
		useState<chooseTemplateProps>({
			name: '',
			template: ''
		});

	return (
		<S.MyTemplateContainer>
			<div className="row">
				<h1>Meus templates</h1>

				<span>
					<p>Filtrar por: </p>
					<select>
						<option value="basicos">Basicos</option>
						<option value="personalizados">Personalizados</option>
					</select>
				</span>
			</div>

			<div className="grid">
				<TemplateList
					shouldRedirect={true}
					selectedTemplate={selectedTemplate}
					setSelectedTemplate={setSelectedTemplate}
				/>
			</div>
		</S.MyTemplateContainer>
	);
};

export default MyTemplate;
