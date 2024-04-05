import { ITemplateElement } from "@dynamic/@types/template.interface";

export type reviewType = 'Approved' | 'Reproved' | 'InAnalysis';

export interface CampaignProps {
    index: number;
}

export interface EditorBlockProps {
    review: reviewType;
}
