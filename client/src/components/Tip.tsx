import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export const Tip = ({
  children,
  text,
  width = 270,
}: {
  children: React.ReactNode;
  text: string;
  width?: number;
}) => {
  const [onHover, setOnHover] = useState(false);
  const [mousePosition, setMousePosition] = React.useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <>
      {onHover && (
        <Box
          sx={{
            p: 2,
            position: "fixed",
            display: "flex",
            flexWrap: "wrap",
            whiteSpace: "normal",
            borderRadius: 2,

            width: `${width}px`,

            top: mousePosition.y + 15,
            left: Math.min(
              mousePosition.x + 15,
              window.innerWidth - width - 15
            ),

            backgroundColor: "black",
            color: "white",
          }}
        >
          <Typography variant="caption" fontSize={14}>
            {text}
          </Typography>
        </Box>
      )}
      <Box
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        sx={{ display: "inline" }}
      >
        {children}
      </Box>
    </>
  );
};
