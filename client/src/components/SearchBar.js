import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

function SearchBar() {

    return (
        <Grid item xs={12} style={{padding: "10px"}}>
            <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
        </Grid>
    );
}

export default SearchBar;
