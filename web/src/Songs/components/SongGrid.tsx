import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { useState } from 'react';
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

export const SongGrid = ({ songs, noRowsMessage, onDelete, onUpdate, onEditClick}: SongGridProps) => {

  const [colDefs] = useState<ColDef<ISongRow>[]>([
    { field: 'id',
      headerName: '',
      filter: false,
      cellRenderer: (p: ICellRendererParams<ISongRow>) => EditSongButton(p, onEditClick),
      colId: 'edit',
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
      cellRenderer: (p: ICellRendererParams<ISongRow>) => p.data && p.data.editable ? UpdateSongButton(p, onUpdate) : '',
      colId: 'update',
    },
    {
      field: 'id',
      headerName: '',
      filter: false,
      cellRenderer: (p: ICellRendererParams<ISongRow>) => DeleteSongButton(p, onDelete),
      colId: 'delete',
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
        editType="fullRow"
        pagination={true}
        paginationPageSize={20}
        localeText={{ noRowsToShow: noRowsMessage }}
      />
    </div>
  );
}