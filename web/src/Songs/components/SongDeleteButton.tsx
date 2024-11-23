import { ICellRendererParams } from "ag-grid-community";
import { ISong } from "../models/song.types";
import { SongGridRowClickHandler } from "../models/SongGridRowClickHandler";

export const SongDeleteButton = (p: ICellRendererParams<ISong>, handleClick: SongGridRowClickHandler) => {
    return <>
        <button onClick={() => handleClick(p)}>--</button>
    </>;
};
