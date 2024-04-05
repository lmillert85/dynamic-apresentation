import { PropsWithChildren, createContext, useContext, useState } from 'react';
import * as E from './enum';
import * as I from './interface';

const LateralMenuContext = createContext({} as I.LateralMenuContextProps);

const LateralMenuProvider = ({ children }: PropsWithChildren) => {
	const [selectedRoute, setSelectedRoute] = useState<E.contextTypes>(
		E.contextTypes.NEW_CAMPAIGN
	);

	const handleChangeSelectedRoute = (context: E.contextTypes) => {
		setSelectedRoute(context);
	};

	return (
		<LateralMenuContext.Provider
			value={{ selectedRoute, handleChangeSelectedRoute }}
		>
			{children}
		</LateralMenuContext.Provider>
	);
};

const useLateralMenu = () => {
	const context = useContext(LateralMenuContext);
	return context;
};

export { useLateralMenu, LateralMenuProvider };
