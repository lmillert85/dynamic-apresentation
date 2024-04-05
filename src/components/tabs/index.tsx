import * as S from './style';
import * as I from '@dynamic/@types/tabSelectedType.interface';
import { AiOutlineArrowLeft } from 'react-icons/ai';

interface ITabs extends I.TabSelectedType {
    setTabView: (view: I.TabSelectedType['tabSelected']) => void;
}

const Tabs: React.FC <ITabs> = ({ tabSelected, setTabView }) => {
    return (
        <S.TabsContainer tabSelected={tabSelected}>
            <ul>
                <li id="sheets" onClick={() => setTabView('sheets')}>Sheets</li>
                <li id="template" onClick={() => setTabView('template')}>Template</li>
                <li id="preview" onClick={() => setTabView('preview')}>Preview</li>
            </ul>

            <AiOutlineArrowLeft className="arrowBack" />
        </S.TabsContainer>
    );
};

export default Tabs;
