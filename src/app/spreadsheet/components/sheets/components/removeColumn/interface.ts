import { Dispatch, SetStateAction } from "react";
import { Column } from "react-datasheet-grid";

export interface RemoveColumnProps {
    columns: Column[];
    setColumns: Dispatch<SetStateAction<Partial<Column<any, any, string>>[]>>;
    setIsRemoveColumnComponentOpen: Dispatch<SetStateAction<boolean>>
};
