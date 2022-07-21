import React from "react";
import BoyIcon from "@mui/icons-material/Boy";
import GirlIcon from "@mui/icons-material/Girl";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ICharacter from "../types/ICharacter";

interface Props {
  character: ICharacter;
}

export const CHARACTER_CHIP_COLOR: {
  [key: string]: "success" | "error" | "warning";
} = {
  Alive: "success",
  Dead: "error",
  unknown: "warning",
};

const CharacterCard = ({ character }: Props) => {
  return (
    <Link style={{ textDecoration: "none" }} to={`character/${character.id}`}>
      <Card
        sx={{
          cursor: "pointer",
          transition: "transform 0.15s ease-in-out",
          boxShadow: 12,
          width: 340,

          "&:hover": {
            transform: "scale3d(1.08, 1.08, 1.2)",
          },
        }}
      >
        <CardMedia
          sx={{ height: 250 }}
          component="img"
          image={character.image}
          alt={character.name}
        />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="subtitle1"
              color="text.primary"
              sx={{ fontWeight: "fontWeightBold" }}
            >
              {character.name}
            </Typography>
            <Chip
              label={character.status}
              variant="outlined"
              size="small"
              color={
                CHARACTER_CHIP_COLOR[
                  character.status as keyof typeof CHARACTER_CHIP_COLOR
                ]
              }
            />
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center" }}
            color={"grey.700"}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Gender: {character.gender}
            </Typography>
            {character.gender === "Male" && <BoyIcon />}
            {character.gender === "Female" && <GirlIcon />}
          </Box>
          <Typography variant="subtitle2" color="text.secondary">
            Species: {character.species}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Last Location: {character?.location?.name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CharacterCard;
