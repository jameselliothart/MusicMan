import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ISong } from '../models/song.types';
import { DeleteSongButton } from './DeleteSongButton';
import { ISongRow, SongGridRowClickHandler, SongGridRowClickHandlerSync } from '../models/song-grid.types';
import { UpdateSongButton } from './UpdateSongButton';
import { EditSongButton } from './EditSongButton';

interface SongGridProps {
  songs: ISongRow[];
  noRowsMessage: string;
  onDelete: SongGridRowClickHandler;
  onUpdate: SongGridRowClickHandler;
  onEditClick: SongGridRowClickHandlerSync;
}

export const defaultSongs: ISong[] = [
  { id: uuidv4(), artist: 'art1', album: 'debut', name: 'an ode' },
  { id: uuidv4(), artist: 'art1', album: 'debut', name: 'second ode' },
  { id: uuidv4(), artist: 'art2', album: 'first break', name: 'something different' },
]

export const SongGrid = ({ songs, noRowsMessage, onDelete, onUpdate, onEditClick}: SongGridProps) => {

  const [colDefs] = useState<ColDef<ISongRow>[]>([
    { field: 'id',
      headerName: '',
      filter: false,
      cellRenderer: (p: ICellRendererParams<ISongRow>) => EditSongButton(p, onEditClick),
    },
    {
      field: 'artist',
      flex: 2,
      editable: p => p.data ? p.data.editable : false,
      cellClassRules: {
        'bad-cell-content': p => !p.value || p.value.trim().length === 0
      }
    },
    {
      field: 'album',
      flex: 2,
      editable: p => p.data ? p.data.editable : false,
      cellClassRules: {
        'bad-cell-content': p => !p.value || p.value.trim().length === 0
      }
    },
    {
      field: 'name',
      flex: 4,
      editable: p => p.data ? p.data.editable : false,
      cellClassRules: {
        'bad-cell-content': p => !p.value || p.value.trim().length === 0
      }
    },
    {
      field: 'id',
      headerName: '',
      filter: false,
      cellRenderer: (p: ICellRendererParams<ISongRow>) => UpdateSongButton(p, onUpdate),
    },
    {
      field: 'id',
      headerName: '',
      filter: false,
      cellRenderer: (p: ICellRendererParams<ISongRow>) => DeleteSongButton(p, onDelete),
    },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    floatingFilter: true,
    editable: false,
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
        localeText={{ noRowsToShow: noRowsMessage }}
      />
    </div>
  );
}