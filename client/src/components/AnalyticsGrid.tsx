import { Container, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

type ActionsProps = {
  uuid: string;
};

const ActionsComponent = ({ uuid }: ActionsProps) => {
  return (
    <Container sx={{ m: 2 }}>
      <Tooltip title="View Analytics" arrow>
        <IconButton color="info">
          <VisibilityOutlinedIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete Link" arrow>
        <IconButton color="error" onClick={() => alert(uuid)}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Tooltip>
    </Container>
  );
};

const columns: GridColDef[] = [
  {
    field: "shortLink",
    headerName: "Short link",
    flex: 0.5,
  },
  {
    field: "longLink",
    headerName: "Long link",
    flex: 1.2,
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 0.4,
    type: "actions",
    renderCell: (params) => <ActionsComponent uuid={params.row.uuid} />,
  },
];

export const AnalyticsGrid = () => {
  const [tableRows, setTableRows] = useState([
    {
      id: 0,
      uuid: "asdfasdf",
      shortLink: "https://short.ly/my-portfolio-page",
      longLink:
        "https://stackoverflow.com/questions/69222920/module-not-found-cant-resolve-mui-x-data-grid-in-c-users-syndicate-docume",
    },
  ]);

  return (
    <DataGrid
      sx={{ width: "100%" }}
      rows={tableRows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      disableRowSelectionOnClick
    />
  );
};
