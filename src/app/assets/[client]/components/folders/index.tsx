import { useState } from 'react';
import * as S from './style';
import * as I from './interface';
import { FaFolderOpen } from 'react-icons/fa';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useParams, useRouter } from 'next/navigation';
import { GetClients } from '@dynamic/services/feedService';

const Folders: React.FC<I.FolderProps> = ({
	isListView,
}) => {
	
	const router = useRouter();
    const params = useParams();
    const uuidv_client = params.client;
    const client = GetClients(uuidv_client.toString());
	const [folderList, setFolderList] = useState([
		'Campanha ' + client.name
	]);
	const handleChangeBreadcrumbInfo = (): void => {
		
		router.push('/assets/' + client.uuidv +'/driver');
	};

	const renderList = (isListView: boolean = false) => {
		if (!isListView) {
			return folderList.map((folder) => (
				<div
					className="folderContainer"
					key={folder}
					onClick={() => handleChangeBreadcrumbInfo()}
				>
					<div className="folderIcon">
						<FaFolderOpen />
					</div>
					<span className="folderTitle">
						{folder} <MdOutlineKeyboardArrowRight />
					</span>
				</div>
			));
		}

		return (
			<table className="tableView">
				<thead>
					<tr>
						<th></th>
						<th>Titulo</th>
						<th>Criador</th>
					</tr>
				</thead>
				<tbody>
					{folderList.map((folder) => (
						<tr
							key={folder}
							onClick={() => handleChangeBreadcrumbInfo()}
						>
							<td className="tableDataIcon">
								<FaFolderOpen />
							</td>
							<td>{folder}</td>
							<td>Reanimate Demo</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	};

	return (
		<S.Container>
			<section className={isListView ? '' : 'gridView'}>
				{renderList(isListView)}
			</section>
		</S.Container>
	);
};

export default Folders;
