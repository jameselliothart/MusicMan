import { ICellRendererParams } from "ag-grid-community";
import { ISong } from "./song";

export const DeleteSong = (p: ICellRendererParams<ISong>) => {
    return <>
        <button onClick={() => window.alert(p.value)}>--</button>
    </>;
};
