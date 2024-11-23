import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { ClientSideRowModelModule, ColDef, ModuleRegistry } from 'ag-grid-community';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ISong } from './song';
import { DeleteSong } from './DeleteSong';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface SongGridProps {
  songs: ISong[];
}

export const defaultSongs: ISong[] = [
  { id: uuidv4(), artist: 'art1', album: 'debut', name: 'an ode' },
  { id: uuidv4(), artist: 'art1', album: 'debut', name: 'second ode' },
  { id: uuidv4(), artist: 'art2', album: 'first break', name: 'something different' },
]

export const SongGrid = ({ songs }: SongGridProps) => {

  // const [rowData, setRowData] = useState<ISong[]>(songs);

  const [colDefs, setColDefs] = useState<ColDef<ISong>[]>([
    { field: 'artist' },
    { field: 'album' },
    { field: 'name' },
    {
      field: 'id',
      headerName: '',
      cellRenderer: DeleteSong,
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