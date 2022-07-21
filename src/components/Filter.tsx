import React, { useState } from "react";
import {
  Chip,
  Popover,
  Paper,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Ifilter } from "../hooks/useFetchCharactersQuery";

type Props = {
  currentFilter: Ifilter;
  onFilterChange: (key: string, value: string) => void;
};

// Filter Options that will be shown in popover
const FILTER_OPTIONS = [
  {
    key: "gender",
    displayName: "Gender",
    options: ["Male", "Female", "Unknown"],
  },
  {
    key: "status",
    displayName: "Status",
    options: ["Alive", "Dead", "Unknown"],
  },
];

const Filter = ({ currentFilter, onFilterChange }: Props) => {
  // used as trigger for popover
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Chip
        icon={<FilterAltIcon color="action" />}
        label="Filter"
        sx={{ marginRight: 2, ml: 2 }}
        onClick={handleClick}
        clickable
      />
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ mt: "10px" }}
      >
        <Paper
          sx={{
            padding: "30px 15px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {FILTER_OPTIONS.map((filter) => {
            const { displayName, options, key } = filter;
            return (
              <Box key={key}>
                <Typography variant="body2" fontWeight="fontWeightBold">
                  {displayName}
                </Typography>
                <ToggleButtonGroup
                  color="error"
                  value={currentFilter?.[key as keyof typeof currentFilter]}
                  exclusive
                  sx={{ pt: "5px" }}
                  onChange={(
                    event: React.MouseEvent<HTMLElement, MouseEvent>,
                    value: string
                  ) => {
                    onFilterChange(key, value);
                  }}
                  title={`filter-group-${key}`}
                >
                  {options.map((option: string) => (
                    <ToggleButton
                      size="small"
                      value={option}
                      sx={{ width: "90px", borderRadius: "16px" }}
                      key={option}
                    >
                      <Typography variant="subtitle2" color="text.secondary">
                        {option}
                      </Typography>
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>
            );
          })}
        </Paper>
      </Popover>
    </>
  );
};

export default Filter;
