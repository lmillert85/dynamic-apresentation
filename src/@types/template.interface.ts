export interface ITemplate {
	// banner: string;
	// template: string;
	elementos: Array<ITemplateElement>;
    aproved: boolean | null;
	// name: string;
    // width: any;
    // height: any;
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

