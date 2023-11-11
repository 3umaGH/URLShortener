import { Container, IconButton, Tooltip, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import {
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from "@mui/icons-material";
import { AlertTimeoutProps, LINKFORM_PAGES } from "../constants";
import { getSavedURLs } from "../utils/storageUtils";
import { PayloadType } from "./LinkForm/LinkForm";

import CircularProgress from "@mui/material/CircularProgress";
import { AlertTimeout } from "./AlertTimeout";

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
  const [messageAlert, sendMessage] = useState<AlertTimeoutProps>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Load data from local storage on first render
    setTimeout(() => {
      try {
        setTableRows(
          getSavedURLs().map((url) => ({
            id: url.id || 0,
            uuid: url.uuid,
            shortLink: `${import.meta.env.VITE_APP_API}/${url.URLSuffix}`,
            originalURL: url.originalURL,
          }))
        );

        setLoading(false);
      } catch (error) {
        sendMessage({
          key: Date.now(),
          message: {
            severity: "error",
            text: "Error mapping data",
            timeout: 60000,
          },
        });
        console.error("Error mapping data:", error);
      }
      setLoading(false);
    }, 250);
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
      {messageAlert && (
        <AlertTimeout
          key={messageAlert.key}
          message={messageAlert.message}
          sx={{ mb: 5, mt: 1.5 }}
        />
      )}

      {isLoading && (
        <Grid
          item
          xs={12}
          sx={{
            height: "370px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={90} sx={{ color: "gray" }} />
        </Grid>
      )}

      <DataGrid
        sx={{ width: "100%" }}
        rows={tableRows ?? []}
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
    </>
  );
};
