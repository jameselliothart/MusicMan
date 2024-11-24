import { ICellRendererParams } from "ag-grid-community";
import DeleteIcon from '@mui/icons-material/Delete';
import { ISongRow, SongGridRowClickHandler } from "../models/song-grid.types";

export const DeleteSongButton = (p: ICellRendererParams<ISongRow>, onDelete: SongGridRowClickHandler) => {
    return <>
        <span onClick={() => onDelete(p)} className="clickable"><DeleteIcon fontSize="small" /></span>
    </>;
};
