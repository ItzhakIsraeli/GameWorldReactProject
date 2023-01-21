import {IconButton, InputBase, Paper} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import React, {useEffect} from "react";
import Filter from "./Filter";
import {useDispatch, useSelector} from "react-redux";
import {addSearchText} from "../redux/filterOptions/filterOptionsActions";
import {filterOptionsMiniStore, StoreState} from "../redux/miniStore";

export default function Search() {
    const dispatch = useDispatch();
    const [filterIsOpen, setFilterIsOpen] = React.useState<boolean>(false);
    const [searchText, setSearchText] = React.useState<string>('');
    const [isFilterOn, setIsFilterOn] = React.useState<boolean>(false);
    const filterOptions = useSelector((state: StoreState) => filterOptionsMiniStore(state).filterOptions);

    useEffect(() => {
        if (filterOptions.minUserRate !== '' || filterOptions.minMetaScore !== '' ||
            filterOptions.minPrice !== '' || filterOptions.maxPrice !== '' || filterOptions.platform !== '') {
            setIsFilterOn(true);
        } else {
            setIsFilterOn(false);
        }
    }, [filterOptions])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSearch();
    }

    const handleSearch = () => {
        dispatch(addSearchText(searchText));
    }

    const closeFilterDialog = () => {
        setFilterIsOpen(false);
    }

    const handleClearText = () => {
        setSearchText('');
        dispatch(addSearchText(''));
    }

    return (<>
            <Paper onSubmit={handleSubmit}
                   component="form"
                   sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
            >
                <InputBase
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                    sx={{ml: 1, flex: 1}}
                    placeholder="Search games from our infinite list "
                    inputProps={{'aria-label': 'Search games from our infinite list '}}
                />
                <IconButton type="button" sx={{p: '10px'}} aria-label="search" onClick={handleClearText}>
                    <ClearIcon/>
                </IconButton>
                <IconButton type="button" sx={{p: '10px'}} aria-label="search" onClick={handleSearch}>
                    <SearchIcon/>
                </IconButton>
                <IconButton type="button" sx={{p: '10px'}}
                            aria-label="search" onClick={() => setFilterIsOpen(true)}>
                    <FilterListIcon color={isFilterOn ? "primary" : 'disabled'}/>
                </IconButton>
            </Paper>
            <Filter isFilterOpen={filterIsOpen} handleCloseFilterForm={closeFilterDialog}/>
        </>
    )
}