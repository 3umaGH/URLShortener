import { useState, useEffect } from "react";
import { Alert, Collapse, Typography } from "@mui/material";
import { AlertTimeoutProps } from "../constants";

export const AlertTimeout = ({ sx, message }: AlertTimeoutProps) => {
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => setVisible(false), message.timeout);

    return () => clearTimeout(timeoutId);
  }, [message.timeout]);

  return (
    <>
      <Collapse in={isVisible} timeout={1000}>
        <Alert severity={message.severity} sx={sx}>
          <Typography variant="subtitle1" fontSize={16}>
            {message.text}
          </Typography>
        </Alert>
      </Collapse>
    </>
  );
};
