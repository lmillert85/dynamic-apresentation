'use client';

import { useState } from 'react';
import { AiFillPlusCircle, AiOutlineUnorderedList } from 'react-icons/ai';
import * as S from './style';
import Breadcrumb from '@dynamic/components/breadcrumb';
import { BsFillGridFill } from 'react-icons/bs';
import Folders from './components/folders';
import * as I from './interface';
import { useParams } from 'next/navigation';
import { GetClients } from '@dynamic/services/feedService';

const AssetsClient = () => {	
    const params = useParams();
    const uuidv_client = params.client;
    const client = GetClients(uuidv_client.toString());
	const [gotoBreadcrumb, setGotoBreadcrumb] = useState([
		'/assets',
		'/assets/' + client.name
	]);
	const [pathBreadcrumb, setPathBreadcrumb] = useState([
		'Meus assets',
		client.name
	]);
	const [isFolderViewList, setIsFolderViewList] = useState(true);
	
	return (
		<S.Container>
			<section className="titleButtons">
				<h1>Meus assets</h1>

				<AiFillPlusCircle className="iconStyle" />
			</section>

			<section className="breadcrumbContainer">
				<span className="breadcrumb">
					<Breadcrumb paths={pathBreadcrumb} goto={gotoBreadcrumb} />
				</span>

				<div className="controls">
					<div
						onClick={() => setIsFolderViewList(false)}
						onKeyDown={() => null}
					>
						<BsFillGridFill />
					</div>
					<div
						onClick={() => setIsFolderViewList(true)}
						onKeyDown={() => null}
					>
						<AiOutlineUnorderedList />
					</div>
				</div>
			</section>

			<div>
				<Folders isListView={isFolderViewList} />
			</div>
		</S.Container>
	);
};

export default AssetsClient;
