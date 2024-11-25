import { FC, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  List,
  ListItem,
} from "@mui/material";
import { dijkstra, Graph, Distances } from "../utils/dijkstra";
import GraphDataExample from "./GraphDataExample";

const Dijkstra: FC = () => {
  const [graphInput, setGraphInput] = useState<string>("");
  const [startVertex, setStartVertex] = useState<string>("A");
  const [result, setResult] = useState<Distances | null>(null);
  const [showImage, setShowImage] = useState<boolean>(false);

  const handleCalculate = () => {
    try {
      const graph: Graph = parseGraphInput(graphInput);
      const distances = dijkstra(graph, startVertex);
      setResult(distances);
      setShowImage(false);
    } catch (error) {
      alert("Невірний формат графа!");
    }
  };

  const parseGraphInput = (input: string): Graph => {
    const graph: Graph = {};
    const lines = input.split("\n");
    lines.forEach((line) => {
      const [vertex, ...edges] = line.split(",");
      graph[vertex.trim()] = {};
      edges.forEach((edge) => {
        const [neighbor, weight] = edge.split(":");
        graph[vertex.trim()][neighbor.trim()] = parseInt(weight.trim(), 10);
      });
    });
    return graph;
  };

  const handleUseTestData = (data: string) => {
    setGraphInput(data);
    setShowImage(true);
    setResult(null);
  };

  return (
    <Container
      sx={{ width:800, bgcolor: "#f4f4f9", padding: 4, borderRadius: 2, boxShadow: 3 }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", color: "#3f51b5", marginBottom: 2 }}
      >
        Алгоритм Дейкстри
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">
          Введіть граф (формат: вершина, сусід1: вага, сусід2: вага, ...):
        </Typography>
        <TextField
          value={graphInput}
          onChange={(e) => setGraphInput(e.target.value)}
          multiline
          rows={6}
          fullWidth
          sx={{ marginTop: 2 }}
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">Початкова вершина:</Typography>
        <TextField
          value={startVertex}
          onChange={(e) => setStartVertex(e.target.value)}
          fullWidth
          sx={{ marginTop: 2 }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCalculate}
        sx={{ width: "100%" }}
      >
        Обчислити
      </Button>
      <GraphDataExample onUseData={handleUseTestData} /> <br />
      {showImage && <img src="Graph_Example.png" alt="Graph Example" />}
      {result && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6">Результати:</Typography>
          <List>
            {Object.entries(result).map(([vertex, distance]) => (
              <ListItem
                key={vertex}
                sx={{
                  backgroundColor: "#e8eaf6",
                  marginBottom: 1,
                  borderRadius: 1,
                }}
              >
                Відстань від {startVertex} до {vertex}:{" "}
                {distance === Infinity ? "Невідома" : distance}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Container>
  );
};

export default Dijkstra;
