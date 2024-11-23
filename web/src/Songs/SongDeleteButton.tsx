import { ICellRendererParams } from "ag-grid-community";
import { ISong } from "./song.types";
import { SongGridRowClickHandler } from "./SongGridRowClickHandler";

export const SongDeleteButton = (p: ICellRendererParams<ISong>, handleClick: SongGridRowClickHandler) => {
    return <>
        <button onClick={() => handleClick(p)}>--</button>
    </>;
};
