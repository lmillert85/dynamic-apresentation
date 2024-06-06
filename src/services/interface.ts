export interface IClients{
	name: string;
	logo: string;
	uuidv: string;
    campaign: string;
}

export interface ICampaign {
	uuidv: string,
    uuidv_client: string,
    uuidv_template: string,
	id: number | null,
    name: string,
    aproved: Array<number>,
    reproved: Array<number>,
    created: string,
	template: ITemplate | null,
    amount: number,
    formats: Array<IFormats>
}

export interface IFormats {
    width: number,
    height: number,
    active: boolean,
    html: string,
    aproved: Array<number>,
    reproved: Array<number>
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

export interface ICreative {
	elementos: Array<ITemplateElement>;
    aproved: boolean | null;
    uuidv: string;
    uuidv_feed: string;
    uuidv_campaign: string;
}

export interface IFeed {
    sheets: Array<ICreative>;
    uuidv: string;
    uuidv_client: string;
    uuidv_template: Array<ITemplateElement>;
    uuidv_campaign: string;
}

export interface ITemplate {    
    name: string,
    banner: string,
    width: string,
    height: string,
    elementos: Array<ITemplateElement>
}

export interface IAssets {    
    id: number;
    name: string;
    image: string;
    type: string;
    updatedAt: string;
    size: string;
    uuidv_client: string;
}

export interface IUpdateFeed {
    row: number;
    column: number;
    value: string;
    imageName: string | null;
    uuidv: string;
}