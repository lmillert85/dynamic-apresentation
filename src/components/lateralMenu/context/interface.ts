import * as E from './enum';

export interface LateralMenuContextProps {
    selectedRoute: E.contextTypes,
    handleChangeSelectedRoute: (context: E.contextTypes) => void;
};
