import React from 'react';
import * as I from './interface';
import * as S from './style';
import { useRouter } from 'next/navigation';

const Breadcrumb: React.FC<I.BreadcrumbTypes> = ({ paths, goto }) => {
	const router = useRouter();

	const addArrow = (index: number): string =>
		paths.length !== index + 1 ? ' > ' : '';

	return (
		<S.Container>
			{paths.map((path, index) => (
				<p key={Math.random()} onClick={() => router.push(goto[index])}>
					{path} {addArrow(index)}
				</p>
			))}
		</S.Container>
	);
};

export default Breadcrumb;
