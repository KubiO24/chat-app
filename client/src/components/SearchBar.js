import { useRecoilState } from "recoil";  
import { userFilterState } from "../globalState";
import { Grid, TextField } from "@mui/material";

function SearchBar() {
    const [userFilter, setUserFilter] = useRecoilState(userFilterState);

    const handleTextInputChange = event => {
        const text = event.target.value;
        setUserFilter(text);
    };

    return (
        <Grid item xs={12} style={{padding: "10px"}}>
            <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth value={userFilter} onChange={handleTextInputChange} />
        </Grid>
    );
}

export default SearchBar;
