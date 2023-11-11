import { SxProps } from "@mui/material";

export const LINKFORM_PAGES = {
  MAIN_PAGE: 0,
  LINK_LIST: 1,
  LINK_CREATED: 2,
  LINK_DETAILS: 3,
};

export type AlertTimeoutProps = {
  key: number;
  text: string;
  severity: "error" | "warning" | "info" | "success";
  timeout: number;
  sx?: SxProps;
};