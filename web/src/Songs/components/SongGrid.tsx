import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { ClientSideRowModelModule, ColDef, ICellRendererParams, ModuleRegistry } from 'ag-grid-community';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ISong } from '../models/song.types';
import { SongDeleteButton } from './SongDeleteButton';
import { SongGridRowClickHandler } from '../models/song-grid.types';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface SongGridProps {
  songs: ISong[];
  onDelete: SongGridRowClickHandler;
}

export const defaultSongs: ISong[] = [
  { id: uuidv4(), artist: 'art1', album: 'debut', name: 'an ode' },
  { id: uuidv4(), artist: 'art1', album: 'debut', name: 'second ode' },
  { id: uuidv4(), artist: 'art2', album: 'first break', name: 'something different' },
]

export const SongGrid = ({ songs, onDelete }: SongGridProps) => {

  const [colDefs, setColDefs] = useState<ColDef<ISong>[]>([
    { field: 'artist' },
    { field: 'album' },
    { field: 'name' },
    {
      field: 'id',
      headerName: '',
      cellRenderer: (p: ICellRendererParams<ISong>) => SongDeleteButton(p, onDelete),
    },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  return (
    <div className={"ag-theme-balham-dark"} style={{ width: '100%', height: '400px' }}>
      <AgGridReact rowData={songs} columnDefs={colDefs} defaultColDef={defaultColDef} />
    </div>
  );
}