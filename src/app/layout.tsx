'use client';

import { Inter } from 'next/font/google';
import StyledComponentsRegistry from './registry';
import Layout from '@dynamic/template/layout';
import ContextWrapper from '@dynamic/contexts';
import { GlobalStyle } from '@dynamic/styles/globals';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
            <head>
                <title>Dynamic ads</title>
            </head>
			<body className={inter.className}>
                <StyledComponentsRegistry>
                    <ContextWrapper>
                        <Layout>
                            {children}
                        </Layout>
                    </ContextWrapper>
                    <GlobalStyle />
                </StyledComponentsRegistry>
			</body>
		</html>
	);
}
