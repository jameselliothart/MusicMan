import { ICellRendererParams } from "ag-grid-community";
import EditIcon from '@mui/icons-material/Edit';
import { ISongRow, SongGridRowClickHandlerSync } from "../models/song-grid.types";

export const EditSongButton = (p: ICellRendererParams<ISongRow>, onClick: SongGridRowClickHandlerSync) => {
    return <>
        <span onClick={() => onClick(p)} className="clickable"><EditIcon fontSize="small" /></span>
    </>;
};
