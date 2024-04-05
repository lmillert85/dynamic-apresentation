import { useState } from 'react';
import * as S from './style';
import * as I from './interface';
import { FaFolderOpen } from 'react-icons/fa';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const Folders: React.FC<I.FolderProps> = ({
	isListView,
}) => {
	const [folderList, setFolderList] = useState([
		'300x600'
	]);
	const router = useRouter();

	const handleChangeBreadcrumbInfo = (): void => {
		console.log('handleChangeBreadcrumbInfo')
		router.push('/assets/vivo/driver');
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
							<td>Gustavo Santos Melo</td>
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
