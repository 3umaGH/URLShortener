import { useState, useEffect } from "react";
import { Alert, Collapse } from "@mui/material";
import { SxProps } from "@mui/system";

type AlertTimeoutProps = {
  severity: "error" | "warning" | "info" | "success";
  timeout: number;
  sx?: SxProps;
  children: JSX.Element;
};

export const AlertTimeout = ({
  severity,
  timeout,
  children,
  sx,
}: AlertTimeoutProps) => {
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    setTimeout(() => setVisible(false), timeout);
  }, [children, timeout]);

  return (
    <Collapse in={isVisible}>
      <Alert severity={severity} sx={sx}>
        {children}
      </Alert>
    </Collapse>
  );
};
