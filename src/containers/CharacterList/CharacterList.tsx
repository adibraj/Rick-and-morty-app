import React, { useState } from "react";
import { SearchOutlined } from "@mui/icons-material";
import {
  Backdrop,
  CircularProgress,
  Container,
  InputBase,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import { useDebounce } from "../../hooks/useDebounce";
import {
  Ifilter,
  useFetchCharactersQuery,
} from "../../hooks/useFetchCharactersQuery";
import CharacterCard from "../../components/CharacterCard";
import Filter from "../../components/Filter";

const CharacterList = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<Ifilter>({}); // Object that stores query filter other than name
  const [page, setPage] = useState<number>(1);
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500); // Debounce search term to delay network call by 500ms

  const { characters, pages, loading } = useFetchCharactersQuery(
    page,
    filter,
    debouncedSearchTerm
  );

  const onPageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ): void => {
    setPage(page);
  };

  const onFilterChange = (key: string, value: string) => {
    setFilter((prevFilter) => ({ ...prevFilter, [key]: value }));
    setPage(1);
  };

  const onSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchTerm(event?.target?.value);
    setPage(1);
  };

  const getLoaderDom = () => {
    if (!loading) {
      return null;
    }
    return (
      <Backdrop
        sx={{
          color: "common.white",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" sx={{ mr: 1 }} /> Loading...
      </Backdrop>
    );
  };

  const getNoCharactersDom = () => {
    if (characters?.length || loading) {
      return null;
    }
    return (
      <Typography sx={{ alignSelf: "center" }} color="error">
        No Characters Found
      </Typography>
    );
  };

  const getSearchDom = () => (
    <Paper
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        maxWidth: "350px",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Character"
        inputProps={{ "aria-label": "search character" }}
        value={searchTerm}
        onChange={onSearchChange}
      />
      <SearchOutlined />
    </Paper>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        padding: "20px",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        maxWidth="xl"
      >
        {getSearchDom()}
        <Filter currentFilter={filter} onFilterChange={onFilterChange} />
      </Container>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "center",
          marginBottom: 5,
          marginTop: 3,
          flex: 1,
        }}
        maxWidth="xl"
      >
        {characters?.map((character) => (
          <CharacterCard character={character} key={character.id} />
        ))}
        {getLoaderDom()}
        {getNoCharactersDom()}
      </Container>
      {!loading && pages && (
        <Pagination
          count={pages}
          color="primary"
          sx={{
            margin: "auto",
            width: "fit-content",
          }}
          page={page}
          onChange={onPageChange}
        />
      )}
    </div>
  );
};

export default CharacterList;
