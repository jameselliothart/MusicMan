import { ICellRendererParams } from "ag-grid-community";
import DeleteIcon from '@mui/icons-material/Delete';
import { ISong } from "../models/song.types";
import { SongGridRowClickHandler } from "../models/song-grid.types";

export const DeleteSongButton = (p: ICellRendererParams<ISong>, onDelete: SongGridRowClickHandler) => {
    return <>
        <span onClick={() => onDelete(p)}><DeleteIcon fontSize="small"/></span>
    </>;
};
