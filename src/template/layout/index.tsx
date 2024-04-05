'use strict';

import Header from '@dynamic/components/header';
import LateralMenu from '@dynamic/components/lateralMenu';
import { PropsWithChildren } from 'react';
import * as S from './style';
import AttachModal from '@dynamic/components/attachModal';
import DownloadModal from '@dynamic/components/downloadModal';
import PreviewEditModal from '@dynamic/components/previewEditModal';
import { useAttachModal } from '@dynamic/contexts/attachModal';

const Layout = ({ children }: PropsWithChildren) => {
	const { isOpen, page } = useAttachModal();
	return (
		<S.LayoutWrapper>
			<DownloadModal />
            <PreviewEditModal />
			<Header />
			<section className="dynamic-layout">
				<LateralMenu />
				{
					isOpen ?
					<AttachModal />
					: <></>
				}
				<span className="views">{children}</span>
			</section>
		</S.LayoutWrapper>
	);
};

export default Layout;
