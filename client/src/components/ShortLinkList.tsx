import { Container, IconButton, Tooltip, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import {
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from "@mui/icons-material";
import { AlertTimeoutProps, LINKFORM_PAGES } from "../constants";
import { deleteURLfromStorage, getSavedURLs } from "../utils/storageUtils";
import { PayloadType } from "./LinkForm/LinkForm";

import CircularProgress from "@mui/material/CircularProgress";
import { AlertTimeout } from "./AlertTimeout";
import { deleteShortLink } from "../api/Api";
import { AxiosResponse } from "axios";

type TableRowProps = {
  id: number;
  uuid: string;
  shortLink: string;
  originalURL: string;
};

type ActionsProps = {
  shortURL: string;
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
    }, 300);
  }, []);

  const handleRowDelete = (uuid: string, shortURL: string) => {
    deleteShortLink(uuid)
      .then((response: AxiosResponse) => {
        if (response.status === 204) {
          sendMessage({
            key: Date.now(),
            message: {
              severity: "success",
              text: "Successfully deleted " + shortURL,
              timeout: 1000,
            },
          });

          deleteRow(uuid);
        }
      })
      .catch((error) => {
        let message = error.message;

        if (error.response.status === 404) {
          message = "Short link not found. Already deleted?";
          deleteRow(uuid);
        }

        sendMessage({
          key: Date.now(),
          message: {
            severity: "error",
            text: message,
            timeout: 6000,
          },
        });
      });
  };

  const handleViewDetails = (uuid: string) => {
    updatePayload({
      uuid: uuid,
    });
    navigatePage(LINKFORM_PAGES.LINK_DETAILS);
  };

  const deleteRow = (uuid: string) => {
    setTableRows((data) => data?.filter((row) => row.uuid !== uuid));
    deleteURLfromStorage(uuid);
  };

  const ActionsComponent = ({ shortURL, uuid }: ActionsProps) => {
    return (
      <Container sx={{ m: 2 }}>
        <Tooltip title="View Analytics" arrow>
          <IconButton color="info" onClick={() => handleViewDetails(uuid)}>
            <VisibilityOutlinedIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete Link" arrow>
          <IconButton
            color="error"
            onClick={() => handleRowDelete(uuid, shortURL)}
          >
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
      renderCell: (params) => (
        <ActionsComponent
          shortURL={params.row.shortLink}
          uuid={params.row.uuid}
        />
      ),
    },
  ];

  return (
    <>
      {messageAlert && (
        <AlertTimeout
          key={messageAlert.key}
          message={messageAlert.message}
          sx={{ mb: 5, mt: 1.5, justifyContent: "center" }}
        />
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
        autoHeight
        slots={{
          noRowsOverlay: () => (
            <Box sx={{ my: 2 }}>
              {typeof tableRows === "undefined" ? (
                <CircularProgress size={90} sx={{ color: "gray" }} />
              ) : (
                <p>No Rows</p>
              )}
            </Box>
          ),
        }}
      />
    </>
  );
};
