import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useMemo, useState } from 'react';

interface IDownloadModal {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const DownloadModalContext = createContext({} as IDownloadModal);

const DownloadModalProvider = ({ children }: PropsWithChildren) => {
	const [isOpen, setIsOpen] = useState(false);

    const memoized = useMemo(() => ({
        isOpen,
        setIsOpen
    }), [isOpen, setIsOpen]);

    return (<DownloadModalContext.Provider value={memoized}>
        {children}
    </DownloadModalContext.Provider>);
};

const useDownloadModalContext = () => {
    const context = useContext(DownloadModalContext);
    return context;
};

export { DownloadModalProvider, useDownloadModalContext }
