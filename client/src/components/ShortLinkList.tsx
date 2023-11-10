import { Container, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import {
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from "@mui/icons-material";
import { LINKFORM_PAGES } from "../constants";
import { getSavedURLs } from "../utils/storageUtils";
import { PayloadType } from "./LinkForm/LinkForm";

type TableRowProps = {
  id: number;
  uuid: string;
  shortLink: string;
  originalURL: string;
};

type ActionsProps = {
  uuid: string;
};

export const ShortLinkList = ({
  navigatePage,
  updatePayload,
}: {
  navigatePage: (pageID: number) => void;
  updatePayload: (newPayload: PayloadType) => void;
}) => {
  const [tableRows, setTableRows] = useState<TableRowProps[]>();

  useEffect(() => {
    // Load data from local storage on first render
    const savedData = getSavedURLs();

    setTableRows(
      savedData.map((url) => {
        return {
          id: url.id || 0,
          uuid: url.uuid,
          shortLink: `${import.meta.env.VITE_APP_API}/${url.URLSuffix}`,
          originalURL: url.originalURL,
        };
      })
    );
  }, []);

  const ActionsComponent = ({ uuid }: ActionsProps) => {
    return (
      <Container sx={{ m: 2 }}>
        <Tooltip title="View Analytics" arrow>
          <IconButton
            color="info"
            onClick={() => {
              updatePayload({
                uuid: uuid,
              });
              navigatePage(LINKFORM_PAGES.LINK_DETAILS);
            }}
          >
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
      field: "originalURL",
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
    <>
      {tableRows && (
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
      )}
    </>
  );
};
