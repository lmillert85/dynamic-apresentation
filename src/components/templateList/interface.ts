import { Dispatch, SetStateAction } from 'react';
import * as I from '@dynamic/@types/chooseTemplate.interface'

export interface TemplateProps {
	selectedTemplate: I.chooseTemplateProps;
	setSelectedTemplate: Dispatch<SetStateAction<I.chooseTemplateProps>>;
    shouldRedirect?: boolean;
}
