import axios from 'axios'
import { IAssets, ICampaign, IClients, ICreative, IFeed, ITemplateElement, IUpdateFeed } from './interface';
import { getElementsTemplate } from '@dynamic/helpers/banner';
import template300x600 from '../../public/assets/300x600/300x600.html';
import template400x400 from '../../public/assets/400x400/400x400.html';
import Headset  from '../../public/assets_dynamic/300x600/Headset-Gamer-Brutal.png';
import CasaSegura  from '../../public/assets_dynamic/300x600/Casa-Segura-Positivo.png';
import Watch1  from '../../public/assets_dynamic/300x600/Watch4-Classic-LTE-46mm.png';
import Watch2  from '../../public/assets_dynamic/300x600/Watch4-Classic-LTE-42mm.png';
import Watch3  from '../../public/assets_dynamic/300x600/Watch4-Classic-BT-44mm.png';
import FoneOuvido  from '../../public/assets_dynamic/300x600/Motorolo-Pulse-120.png';
import Buds2  from '../../public/assets_dynamic/300x600/Samsung-Galaxy-Buds2.png';
import A52  from '../../public/assets_dynamic/300x600/Samsung-Galaxy-A52s-5G.png';
import S21  from '../../public/assets_dynamic/300x600/Samsung-Galaxy-S21-128GB.png';
import Edge  from '../../public/assets_dynamic/300x600/motorola-edge-20.png';
import G60  from '../../public/assets_dynamic/300x600/Moto-g60.png';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';
import { ITemplate } from '@dynamic/@types/template.interface';
		
var template = getElementsTemplate(template300x600.toString());
var sheets: Array<ICreative> = [
	{
		elementos: template.elementos,
		aproved: null,
		uuidv: "1e0d824c-5049-456b-a9df"
	}
];

var campaigns: Array<ICampaign> = [];

export async function PostCampaign(campaign: ICampaign) {
	return new Promise((resolve) => {
		campaigns.push(campaign);
		resolve(true);
	});
}

export async function GetClients(uuidv: string): Promise<Array<IClients>> {
	return new Promise((resolve, reject) => {
		var clients: Array<IClients> = [{
			name: 'TIM',	
			uuidv: '422eb33a-a5fb-4922-9424-5e51ba94ba49', 
			logo: 'data:image/webp;base64,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'
		}];
		resolve(clients);
	})
}

export function GetCampaign(uuidv: string): Promise<Array<ICampaign>> {
	return new Promise((resolve, reject) => {
		resolve(campaigns);
	  });
}

export function GetSheets(uuidv: string): Promise<Array<ICreative>> {
	return new Promise((resolve, reject) => {
		resolve(sheets);
	  }
	);
}

export function PostChangeSheets(update: IUpdateFeed) {
	return new Promise((resolve, reject) => {
		sheets[update.row].elementos[update.column].value = update.value;
		sheets[update.row].elementos[update.column].imageName = update.imageName ?? '';
		resolve(true);
		reject(false);
	});
}

export function PostAproved(items: Array<number>, type: string, uuidv: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		if (type === 'Approved') campaigns[0].aproved = items;
		if (type === 'Reproved') campaigns[0].reproved = items;
		resolve(true);
	});
}

export function PostRowSheets(uuidv: string, type: string) {
	return new Promise((resolve, reject) => {
		if (type === 'add') sheets.push(JSON.parse(JSON.stringify(sheets[0])));
		if (type === 'remove') sheets.pop();
		campaigns[0].amount = sheets.length;
		resolve(true);
		reject(false);
	});
}

export async function GetAssets(): Promise<Array<IAssets>> {
	var assets: Array<IAssets> = 
	[
		{
			id: 11,
			name: 'Headset.png',
			image: Headset.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '34.56kb'
		},
		{
			id: 10,
			name: 'CasaSegura.png',
			image: CasaSegura.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '25.56kb'
		},
		{
			id: 9,
			name: 'Watch1.png',
			image: Watch1.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '29.56kb'
		},
		{
			id: 8,
			name: 'Watch2.png',
			image: Watch2.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '29.56kb'
		},
		{
			id: 7,
			name: 'Watch3.png',
			image: Watch3.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '30.56kb'
		},
		{
			id: 6,
			name: 'FoneOuvido.png',
			image: FoneOuvido.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '31.56kb'
		},
		{
			id: 5,
			name: 'Buds2.png',
			image: Buds2.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '44.56kb'
		},
		{
			id: 4,
			name: 'A52.png',
			image: A52.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '44.56kb'
		},
		{
			id: 3,
			name: 'S21.png',
			image: S21.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '38.56kb'
		},
		{
			id: 2,
			name: 'Edge.png',
			image: Edge.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '33.56kb'
		},
		{
			id: 1,
			name: 'G60.png',
			image: G60.src,
			type: 'image',
			updatedAt: '11/01/2023 - Gustavo',
			size: '38.56kb'
		}
	]
	
	return assets;
}

export async function GetTemplates(): Promise<Array<ITemplate>> {	
	return new Promise((resolve, reject) => {
		var template = getElementsTemplate(template300x600.toString());		
		template.formats[0].html = template300x600.toString();
		template.formats[1].html = template400x400.toString();
		resolve([template]);
	  });
}