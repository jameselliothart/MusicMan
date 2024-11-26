import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { useState } from 'react';
import { DeleteSongButton } from './DeleteSongButton';
import { ISongRow, SongGridRowClickHandlerAsync, SongGridRowClickHandler } from '../models/song-grid.types';
import { UpdateSongButton } from './UpdateSongButton';
import { EditSongButton } from './EditSongButton';
import { MAX_FIELD_LENGTH } from '../models/song.types';
import { isValidFieldValue } from '../services/songs.utils';

interface SongGridProps {
  songs: ISongRow[];
  noRowsMessage: string;
  onDelete: SongGridRowClickHandlerAsync;
  onUpdate: SongGridRowClickHandlerAsync;
  onEditClick: SongGridRowClickHandler;
}

export const SongGrid = ({ songs, noRowsMessage, onDelete, onUpdate, onEditClick }: SongGridProps) => {

  const [colDefs] = useState<ColDef<ISongRow>[]>([
    {
      field: 'id',
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
        'bad-cell-content': p => !isValidFieldValue(p.value, MAX_FIELD_LENGTH)
      }
    },
    {
      field: 'album',
      flex: 2,
      editable: p => p.data ? p.data.editable : false,
      cellClassRules: {
        'bad-cell-content': p => !isValidFieldValue(p.value, MAX_FIELD_LENGTH)
      }
    },
    {
      field: 'name',
      flex: 4,
      editable: p => p.data ? p.data.editable : false,
      cellClassRules: {
        'bad-cell-content': p => !isValidFieldValue(p.value, MAX_FIELD_LENGTH)
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
    <div className={"ag-theme-balham-dark"} style={{ width: '80%', height: '800px' }}>
      <AgGridReact rowData={songs} columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={50}
        localeText={{ noRowsToShow: noRowsMessage }}
      />
    </div>
  );
}