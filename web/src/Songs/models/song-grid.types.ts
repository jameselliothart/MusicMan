import { ICellRendererParams } from "ag-grid-community";
import { ISong } from "./song.types";

export interface ISongRow extends ISong {
  editable: boolean;
}

export namespace ISongRow {
  export const create = (song: ISong, editable: boolean = false): ISongRow => {
    return { ...song, editable };
  };
}

export type SongGridRowClickHandler = (params: ICellRendererParams<ISongRow>) => Promise<void>;
export type SongGridRowClickHandlerSync = (params: ICellRendererParams<ISongRow>) => void;
