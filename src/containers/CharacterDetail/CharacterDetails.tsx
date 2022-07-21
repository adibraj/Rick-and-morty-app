import React from "react";
import {
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useFetchCharacterDetailQuery } from "../../hooks/useFetchCharacterDetailQuery";
import { CHARACTER_CHIP_COLOR } from "../../components/CharacterCard";

// Character Properties that would be displayed
const CHARACTER_PROPERTIES = [
  {
    label: "Gender",
    key: "gender",
  },
  {
    label: "Species",
    key: "species",
  },
  {
    label: "Subspecies",
    key: "type",
  },
  {
    label: "Last Location",
    key: "location",
    subKey: "name",
  },
  {
    label: "Last Location Type",
    key: "location",
    subKey: "type",
  },
  {
    label: "Origin Location",
    key: "origin",
    subKey: "name",
  },
];

const CharacterDetails = () => {
  let params = useParams();
  const { character, loading, error } = useFetchCharacterDetailQuery(
    params.characterId || ""
  );
  const { name, episode, image, status, location } = character || {};

  const getEpisodesTable = () => (
    <TableContainer sx={{ maxHeight: "68vh" }}>
      <Table size="small" stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Episode</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Air Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {episode?.map((row) => (
            <TableRow
              key={row.episode}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.episode}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.air_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const getBackButton = () => (
    <Link
      style={{
        display: "flex",
        textDecoration: "none",
        width: "fit-content",
        marginTop: "20px",
      }}
      to="/"
    >
      <Button variant="contained"> Back To List</Button>
    </Link>
  );

  if (loading) {
    return (
      <Backdrop
        sx={{
          color: "common.white",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" sx={{ mr: 2 }} />
        Loading...
      </Backdrop>
    );
  }

  if (!character || error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" color="error">
          {error
            ? "Something went wrong please try again"
            : "Character details not found!!!"}
        </Typography>
        {getBackButton()}
      </Box>
    );
  }

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { md: "center" },
        justifySelf: "center",
        overflowY: "auto",
        gap: 8,
        mt: 4,
        mb: 4,
        p: 3,
        maxWidth: "lg",
      }}
      elevation={12}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img src={image} alt={name} height={400} width={400} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 1,
            gap: 2,
            pl: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Typography
              variant="h5"
              color="text.primary"
              sx={{ fontWeight: "fontWeightBold" }}
            >
              {name}
            </Typography>
            <Chip
              label={status}
              variant="outlined"
              size="small"
              color={
                CHARACTER_CHIP_COLOR[
                  status as keyof typeof CHARACTER_CHIP_COLOR
                ]
              }
            />
          </Box>
          {CHARACTER_PROPERTIES.map((property) => {
            const label = property.label;
            let value = character[property.key as keyof typeof character];
            if (property.key === "location" || property.key === "origin") {
              value =
                location?.[property.subKey as keyof typeof location] || "NA";
            }
            return (
              <Box
                sx={{ display: "flex", gap: 2, alignItems: "center" }}
                key={`${property.label}-${property.key}`}
              >
                <Typography
                  variant="subtitle2"
                  color="text.primary"
                  fontWeight="500"
                  sx={{ width: "180px" }}
                >
                  {label}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {(value as string) || "NA"}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4,
          flex: 1,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Episodes
        </Typography>
        {getEpisodesTable()}
        {getBackButton()}
      </Box>
    </Paper>
  );
};

export default CharacterDetails;
