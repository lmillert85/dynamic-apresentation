import { Dispatch, SetStateAction } from 'react';
import * as I from '../../interface';

export interface SpreadsheetTemplateTypes extends I.HTMLTemplateProps {
    template: 'basic' | 'custom';
    setHtmlTemplateSelected: Dispatch<SetStateAction<string>>;
};
