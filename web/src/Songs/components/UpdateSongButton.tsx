import { ICellRendererParams } from "ag-grid-community";
import SaveIcon from '@mui/icons-material/Save';
import { ISongRow, SongGridRowClickHandlerAsync } from "../models/song-grid.types";

export const UpdateSongButton = (p: ICellRendererParams<ISongRow>, onUpdate: SongGridRowClickHandlerAsync) => {
    return <>
        <span onClick={() => onUpdate(p)} className="clickable"><SaveIcon fontSize="small" /></span>
    </>;
};
