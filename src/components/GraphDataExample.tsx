import { FC } from "react";
import { Button } from "@mui/material";

const GraphDataExample: FC<{ onUseData: (data: string) => void }> = ({
  onUseData,
}) => {
  const graphData = `A, B:1, C:4\nB, A:1, C:2, D:5\nC, A:4, B:2, D:1\nD, B:5, C:1`;

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => onUseData(graphData)}
        sx={{
          marginTop: 2,
          backgroundColor: "#3f51b5",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#303f9f",
          },
        }}
      >
        Використати тестові дані
      </Button>
    </div>
  );
};

export default GraphDataExample;
