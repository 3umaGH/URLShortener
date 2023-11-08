import { Container, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export const AnalyticsGrid = ({
  navigatePage,
}: {
  navigatePage: (pageID: number) => void;
}) => {
  const [tableRows, setTableRows] = useState([
    {
      id: 0,
      uuid: "asdfasdf",
      shortLink: "https://short.ly/my-portfolio-page",
      longLink:
        "https://stackoverflow.com/questions/69222920/module-not-found-cant-resolve-mui-x-data-grid-in-c-users-syndicate-docume",
    },
  ]);

  type ActionsProps = {
    uuid: string;
  };

  const ActionsComponent = ({ uuid }: ActionsProps) => {
    return (
      <Container sx={{ m: 2 }}>
        <Tooltip title="View Analytics" arrow>
          <IconButton color="info" onClick={() => navigatePage(2)}>
            <VisibilityOutlinedIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete Link" arrow>
          <IconButton color="error">
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
      minWidth: 150,
    },
    {
      field: "longLink",
      headerName: "Long link",
      flex: 1.2,
      minWidth: 20,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 0.4,
      minWidth: 150,
      renderCell: (params) => <ActionsComponent uuid={params.row.uuid} />,
    },
  ];

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
