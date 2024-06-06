import { IFormats } from "@dynamic/services/interface";

export interface ITemplate {
	banner: string;
	uuidv: string;
	template: string;
	elementos: Array<ITemplateElement>;
    aproved: boolean | null;
	name: string;
    width: any;
    height: any;
    formats: Array<IFormats>,
    fonts: any | null
}

export interface IFonts {
    fontfamily: string,
    src: string
}

export interface ITemplateElement {
    id: string;
    dinamico: boolean;
    tipo: 'b64' | 'text';
    font: string;
    value: string;
    key: string;
    imageName?: string;
}

export interface IReviewedCampaign {
    index: number;
    aproved: boolean | null;
}

