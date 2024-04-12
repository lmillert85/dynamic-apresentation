import { ITemplateElement } from '@dynamic/@types/template.interface';
import * as I from '../../interface';
import { ICreative } from '@dynamic/services/interface';

export interface SpreadsheetPreviewTypes {
    viewType: 'pages' | 'slide' | 'infiniteScroll';
};

export interface PreviewDataChild {
    data: Array<ICreative>;
}

export interface PreviewProps extends I.HTMLTemplateProps {}
