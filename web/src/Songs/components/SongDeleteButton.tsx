import { ICellRendererParams } from "ag-grid-community";
import { ISong } from "../models/song.types";
import { SongGridRowClickHandler } from "../models/song-grid.types";

export const SongDeleteButton = (p: ICellRendererParams<ISong>, onDelete: SongGridRowClickHandler) => {
    return <>
        <button onClick={() => onDelete(p)}>--</button>
    </>;
};
