import axios from 'axios'
import { IAssets, ICampaign, IClients, ICreative, IFeed, ITemplateElement, IUpdateFeed } from './interface';
import { getElementsTemplate } from '@dynamic/helpers/banner';
import template_ATM from '../../public/assets/ATM/512x384.html';
import template_LightBox from '../../public/assets/LightBox/272x606.html';
import { v4 as uuidv4 } from 'uuid';

import DiasDosPais_ATM  from '../../public/assets/Assets/ATM/bg_diadospais.png';
import BgNatal_ATM  from '../../public/assets/Assets/ATM/bg_natal.png';
import QRCodePais_ATM  from '../../public/assets/Assets/ATM/qrcode_diadospais.png';
import QRCodeNatal_ATM  from '../../public/assets/Assets/ATM/qrcode_natal.png';
import SeloPais_ATM  from '../../public/assets/Assets/ATM/selo_diadospais.png';
import SeloNatal_ATM  from '../../public/assets/Assets/ATM/selo_natal.png';

import DiasDosPais_LightBox  from '../../public/assets/Assets/LightBox/bg_diadospais.png';
import BgNatal_LightBox  from '../../public/assets/Assets/LightBox/bg_natal.png';
import SeloPais_LightBox  from '../../public/assets/Assets/LightBox/selo_diadospais.png';
import SeloNatal_LightBox  from '../../public/assets/Assets/LightBox/selo_natal.png';

import { ITemplate } from '@dynamic/@types/template.interface';

var listSheets: Array<IFeed> = [];
var campaigns: Array<ICampaign> = [];
var templateElementos_ATM: Array<ITemplateElement> = [];
var templateElementos_LightBox: Array<ITemplateElement> = [];

var _newCampaign = "";
var _newClient = "";
var _selectedRoute = "newCampaign";

const assets: Array<IAssets> = 
	[
		{
			id: 10,
			name: 'bg_diadospais_ATM.png',
			image: DiasDosPais_ATM.src,
			type: 'image',
			updatedAt: '24/06/2024 - Reanimate Demo',
			size: '34.56kb',
			uuidv_client: '422eb33a-a5fb-4922-9424-5e51ba94ba49'
		},
		{
			id: 9,
			name: 'bg_natal_ATM.png',
			image: BgNatal_ATM.src,
			type: 'image',
			updatedAt: '24/06/2024 - Reanimate Demo',
			size: '34.56kb',
			uuidv_client: '422eb33a-a5fb-4922-9424-5e51ba94ba49'
		},
		{
			id: 8,
			name: 'qrcode_diadospais_ATM.png',
			image: QRCodePais_ATM.src,
			type: 'image',
			updatedAt: '24/06/2024 - Reanimate Demo',
			size: '34.56kb',
			uuidv_client: '422eb33a-a5fb-4922-9424-5e51ba94ba49'
		},
		{
			id: 7,
			name: 'qrcode_natal_ATM.png',
			image: QRCodeNatal_ATM.src,
			type: 'image',
			updatedAt: '24/06/2024 - Reanimate Demo',
			size: '34.56kb',
			uuidv_client: '422eb33a-a5fb-4922-9424-5e51ba94ba49'
		},
		{
			id: 6,
			name: 'selo_diadospais_ATM.png',
			image: SeloPais_ATM.src,
			type: 'image',
			updatedAt: '24/06/2024 - Reanimate Demo',
			size: '34.56kb',
			uuidv_client: '422eb33a-a5fb-4922-9424-5e51ba94ba49'
		},
		{
			id: 5,
			name: 'selo_natal_ATM.png',
			image: SeloNatal_ATM.src,
			type: 'image',
			updatedAt: '24/06/2024 - Reanimate Demo',
			size: '34.56kb',
			uuidv_client: '422eb33a-a5fb-4922-9424-5e51ba94ba49'
		},
		{
			id: 4,
			name: 'bg_diadospais_LightBox.png',
			image: DiasDosPais_LightBox.src,
			type: 'image',
			updatedAt: '24/06/2024 - Reanimate Demo',
			size: '34.56kb',
			uuidv_client: '422eb33a-a5fb-4922-9424-5e51ba94ba49'
		},
		{
			id: 3,
			name: 'bg_natal_LightBox.png',
			image: BgNatal_LightBox.src,
			type: 'image',
			updatedAt: '24/06/2024 - Reanimate Demo',
			size: '34.56kb',
			uuidv_client: '422eb33a-a5fb-4922-9424-5e51ba94ba49'
		},
		{
			id: 2,
			name: 'selo_diadospais_LightBox.png',
			image: SeloPais_LightBox.src,
			type: 'image',
			updatedAt: '24/06/2024 - Reanimate Demo',
			size: '34.56kb',
			uuidv_client: '422eb33a-a5fb-4922-9424-5e51ba94ba49'
		},
		{
			id: 1,
			name: 'selo_natal_LightBox.png',
			image: SeloNatal_LightBox.src,
			type: 'image',
			updatedAt: '24/06/2024 - Reanimate Demo',
			size: '34.56kb',
			uuidv_client: '422eb33a-a5fb-4922-9424-5e51ba94ba49'
		},
	];

var clients: Array<IClients> = [{
	name: 'Santander',
	uuidv: '422eb33a-a5fb-4922-9424-5e51ba94ba49',
	logo: 'data:image/png;base64,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',
	campaign: ''
}];

export function selectedRoute() {
	return _selectedRoute;
}

export function setSelectedRoute(c: string) {
	_selectedRoute = c;
}

export function newClient() {
	return _newClient;
}

export function setNewClient(c: string) {
	_newClient = c;
}
export function newCampaign() {
	return _newCampaign;
}

export function setNewCampaign(c: string) {
	_newCampaign = c;
}

export async function PostCampaign(campaign: ICampaign) {
	return new Promise((resolve) => {
		const uuid = uuidv4();
		const uuid2 = uuidv4();
		const uuid3 = uuidv4();
		campaign.uuidv = uuid3;
		campaigns.push(campaign);
		var _templateElementos_ATM = JSON.parse(JSON.stringify(templateElementos_ATM));
		var _templateElementos_LightBox = JSON.parse(JSON.stringify(templateElementos_LightBox));
		var template = [..._templateElementos_ATM];

		switch(campaign.template?.name) {
			case 'template_ATM':
				template = [..._templateElementos_ATM];
				break;
			case 'template_LightBox':
				template = [..._templateElementos_LightBox];
				break;
		}
		const t: ICreative = {
			elementos: template,
			aproved: false,
			uuidv: uuid,
			uuidv_feed: uuid2,
			uuidv_campaign: uuid3
		};
		var c: IFeed = {
			sheets: [t],
			uuidv: uuid2,
			uuidv_client: campaign.uuidv_client,
			uuidv_template: template,
			uuidv_campaign: uuid3
		}

		listSheets.push(c);
 		resolve(uuid2);
	});
}

export async function ListClients(uuidv: string): Promise<Array<IClients>> {
	return new Promise((resolve, reject) => {
		const _clients = [...clients];
		resolve(_clients);
	})
}

export function GetClients(uuidv: string): IClients {
	const _clients = [...clients];
	const s = _clients.findIndex(x => x.uuidv === uuidv);
	return _clients[s];
}

export function GetCampaign(uuidv: string): Promise<Array<ICampaign>> {
	return new Promise((resolve, reject) => {
		const _campaigns = [...campaigns];
		var s = _campaigns.filter(x => x.uuidv_client === uuidv);
		resolve(s);
	  });
}

export function GetSheets(uuidv: string): Promise<IFeed> {
	return new Promise((resolve, reject) => {
		const _listSheets = JSON.parse(JSON.stringify(listSheets));
		var s = _listSheets.findIndex((x: any) => x.uuidv_campaign === uuidv);
		resolve(_listSheets[s]);
	  }
	);
}

export function PostChangeSheets(update: IUpdateFeed) {
	return new Promise((resolve, reject) => {
		const _listSheets = JSON.parse(JSON.stringify(listSheets));
		console.log('_listSheets')
		console.log(_listSheets)
		console.log('update')
		console.log(update)
		var s = _listSheets.findIndex((x: any) => x.uuidv === update.uuidv);
		_listSheets[s].sheets[update.row].elementos[update.column].value = update.value;
		_listSheets[s].sheets[update.row].elementos[update.column].imageName = update.imageName ?? '';
		listSheets = _listSheets;
		resolve(true);
	});
}

export function PostXSLFeed(creative: IFeed, uuidv_campaign: string) {
	return new Promise((resolve, reject) => {
		const _listSheets = JSON.parse(JSON.stringify(listSheets));
		var s = _listSheets.findIndex((x: IFeed) => x.uuidv_campaign === uuidv_campaign);
		const index = campaigns.findIndex((x: ICampaign) => x.uuidv === _listSheets[s].uuidv_campaign);
		var uuid_elemento = uuidv4();
		listSheets[s] = creative;
		listSheets[s].uuidv_campaign = _listSheets[s].uuidv_campaign;
		listSheets[s].uuidv_client = _listSheets[s].uuidv_client;
		listSheets[s].uuidv_template = _listSheets[s].uuidv_template;
		listSheets[s].uuidv = _listSheets[s].uuidv;
		campaigns[index].amount = JSON.parse(JSON.stringify(listSheets[s])).sheets.length;
		console.log('listSheets')
		console.log(listSheets)
		resolve(true);
	});
}

export function PostAproved(items: Array<number>, type: string, uuidv_campaign: string, format: number): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const _campaigns = JSON.parse(JSON.stringify(campaigns));
		const index = _campaigns.findIndex((x: ICampaign) => x.uuidv === uuidv_campaign);
		if (type === 'Approved') campaigns[index].template.formats[format].aproved = items;
		if (type === 'Reproved') campaigns[index].template.formats[format].reproved = items;
		resolve(true);
	});
}

export function PostRowSheets(uuidv: string, type: string) {
	return new Promise((resolve, reject) => {
		const _listSheets = JSON.parse(JSON.stringify(listSheets));
		var s = _listSheets.findIndex(x => x.uuidv_campaign === uuidv);
		var uuid_elemento = uuidv4();
		var _templateElementos_ATM = JSON.parse(JSON.stringify(templateElementos_ATM));
		var _templateElementos_LightBox = JSON.parse(JSON.stringify(templateElementos_LightBox));
		const _campaigns = JSON.parse(JSON.stringify(campaigns));
		const index_campaign = _campaigns.findIndex((x: ICampaign) => x.uuidv === uuidv);
		const template_name = _campaigns[index_campaign].template.name;
		console.log('_campaigns[index_campaign]')
		console.log(_campaigns[index_campaign])
		console.log('template_name')
		console.log(template_name)
		var template = [..._templateElementos_ATM];
		switch(template_name) {
			case 'template_ATM':
				template = [..._templateElementos_ATM];
				break;				
			case 'template_LightBox':
				template = [..._templateElementos_LightBox];
				break;			
		}

		if (type === 'add') {
			if (_listSheets[s].sheets.length > 0) {
				uuid_elemento = _listSheets[s].sheets[0].uuidv;
			}
			const t: ICreative = {
				elementos: template,
				aproved: false,
				uuidv: uuid_elemento,
				uuidv_campaign: _listSheets[s].uuidv_campaign,
				uuidv_feed: _listSheets[s].uuidv
			};			
			listSheets[s].sheets.push(t);
		} else if (type === 'remove') listSheets[s].sheets.pop();
		const index = campaigns.findIndex((x: ICampaign) => x.uuidv === _listSheets[s].uuidv_campaign);
		campaigns[index].amount = JSON.parse(JSON.stringify(listSheets[s])).sheets.length;
		const _list = JSON.parse(JSON.stringify(listSheets[s].sheets));
		resolve(_list);
		reject(false);
	});
}

export async function GetAssets(uuidv_campaign: string): Promise<Array<IAssets>> {
	const _assets = [...assets];
	const _campaigns = JSON.parse(JSON.stringify(campaigns));
	const index = _campaigns.findIndex((x: ICampaign) => x.uuidv === uuidv_campaign);
	const uuidv_client = _campaigns[index].uuidv_client;
	const a = _assets.filter(x => x.uuidv_client === uuidv_client);
	if (_campaigns[index].template.name === "template_ATM") {
		return a.filter(x => x.name.includes("_ATM"));
	} else {
		return a.filter(x => x.name.includes("_LightBox"));
	}
}

export async function GetAssetsByClient(uuidv_client: string): Promise<Array<IAssets>> {
	const _assets = [...assets];
	const a = _assets.filter(x => x.uuidv_client === uuidv_client);
	return a;
}

export async function GetAsset(filename: string): Promise<IAssets> {
	const _assets = [...assets];
	const index = _assets.findIndex(x => x.name === filename);
	return _assets[index];
}

export async function GetTemplates(): Promise<Array<ITemplate>> {	
	return new Promise((resolve, reject) => {
		console.log('GetTemplates')
		var template = getElementsTemplate(template_ATM.toString());
		templateElementos_ATM = template.elementos;	
		template.name = "template_ATM";
		template.uuidv = "9480234-53463-4545-3412345";
		template.formats[0].html = template_ATM.toString();
		template.formats[0].aproved = [];
		template.formats[0].reproved = [];
	
		var templateLightBox = getElementsTemplate(template_LightBox.toString());
		templateLightBox.name = "template_LightBox";
		templateLightBox.uuidv = "7758656-54435-876867-756865";
		templateElementos_LightBox = templateLightBox.elementos;
		templateLightBox.formats[0].html = template_LightBox.toString();
		templateLightBox.formats[0].aproved = [];
		templateLightBox.formats[0].reproved = [];	

		resolve([template, templateLightBox]);
	  });
}

export function GetTemplateElementos(uuidv: string) {
	const _listSheets = JSON.parse(JSON.stringify(listSheets));
	var s = _listSheets.findIndex((x: any) => x.uuidv_campaign === uuidv);
	return _listSheets[s].uuidv_template;
}
