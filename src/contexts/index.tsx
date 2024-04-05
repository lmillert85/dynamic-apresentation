import React, { PropsWithChildren, ReactNode } from 'react';
import { LateralMenuProvider } from '@dynamic/components/lateralMenu/context/lateralMenuContext';
import { v4 as uuidv4 } from 'uuid';
import { SpreadsheetDataProvider } from './spreadsheetData';
import { AttachModalProvider } from './attachModal';
import { SheetImgAttachProvider } from './sheetImgAttach';
import { DownloadModalProvider } from './downloadModal';
import { PreviewEditModalProvider } from './previewEditModal';
import { TemplateDataProvider } from './template';
import { ClientDataProvider } from './client';
import { CampaignDataProvider } from './campaign';
import { DynamicProvider } from './dynamic';

const Providers = ({
	contextProviders,
	children
}: {
	contextProviders: Array<JSX.Element>;
	children: PropsWithChildren | ReactNode;
}) => {
	const renderProvider = (
		contextProviders: Array<JSX.Element>,
		children: PropsWithChildren | ReactNode
	): JSX.Element => {
		const [provider, ...restProviders] = contextProviders;

		if (provider) {
			return React.cloneElement(
				provider,
				undefined,
				renderProvider(restProviders, children)
			);
		}

		return <>{children}</>;
	};

	return renderProvider(contextProviders, children);
};

const ContextWrapper = ({ children }: PropsWithChildren) => {
	return (
		<Providers
			contextProviders={[
				<LateralMenuProvider key={uuidv4()} />,
				<SpreadsheetDataProvider key={uuidv4()} />,
				<TemplateDataProvider key={uuidv4()} />,
				<ClientDataProvider key={uuidv4()} />,
                <AttachModalProvider key={uuidv4()} />,
                <SheetImgAttachProvider key={uuidv4()} />,
                <DownloadModalProvider key={uuidv4()} />,
                <PreviewEditModalProvider key={uuidv4()} />,
				<CampaignDataProvider key={uuidv4()} />,
				<DynamicProvider key={uuidv4()} />
			]}
		>
			{children}
		</Providers>
	);
};

export default ContextWrapper;
