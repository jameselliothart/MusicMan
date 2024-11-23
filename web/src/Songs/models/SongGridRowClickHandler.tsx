import { ICellRendererParams } from "ag-grid-community";
import { ISong } from "./song.types";

export type SongGridRowClickHandler = (params: ICellRendererParams<ISong>) => void;
