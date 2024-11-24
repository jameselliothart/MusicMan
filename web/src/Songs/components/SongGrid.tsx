import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { ClientSideRowModelModule, ColDef, ICellRendererParams, ModuleRegistry } from 'ag-grid-community';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ISong } from '../models/song.types';
import { DeleteSongButton } from './DeleteSongButton';
import { SongGridRowClickHandler } from '../models/song-grid.types';

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

  const [colDefs] = useState<ColDef<ISong>[]>([
    {
      field: 'artist',
      flex: 2,
      cellClassRules: {
        'bad-cell-content': p => !p.value || p.value.trim().length === 0
      }
    },
    {
      field: 'album',
      flex: 2,
      cellClassRules: {
        'bad-cell-content': p => !p.value || p.value.trim().length === 0
      }
    },
    {
      field: 'name',
      flex: 4,
      cellClassRules: {
        'bad-cell-content': p => !p.value || p.value.trim().length === 0
      }
    },
    {
      field: 'id',
      headerName: '',
      flex: 1,
      filter: false,
      editable: false,
      cellRenderer: (p: ICellRendererParams<ISong>) => DeleteSongButton(p, onDelete),
    },
    {
      field: 'id',
      headerName: '',
      flex: 1,
      filter: false,
      editable: false,
      cellRenderer: (p: ICellRendererParams<ISong>) => DeleteSongButton(p, onDelete),
    },
  ]);

  const defaultColDef: ColDef = {
    filter: true,
    floatingFilter: true,
    editable: true,
  };

  return (
    <div className={"ag-theme-balham-dark"} style={{ width: '80%', height: '400px' }}>
      <AgGridReact rowData={songs} columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowSelection={{
          mode: 'multiRow',
          checkboxes: false,
          headerCheckbox: false,
          enableClickSelection: true,
        }}
        pagination={true}
        paginationPageSize={20}

      />
    </div>
  );
}