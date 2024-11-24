import { ICellRendererParams } from "ag-grid-community";
import SaveIcon from '@mui/icons-material/Save';
import { ISong } from "../models/song.types";
import { SongGridRowClickHandler } from "../models/song-grid.types";

export const UpdateSongButton = (p: ICellRendererParams<ISong>, onUpdate: SongGridRowClickHandler) => {
    return <>
        <span onClick={() => onUpdate(p)} className="clickable"><SaveIcon fontSize="small" /></span>
    </>;
};
