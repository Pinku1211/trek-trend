import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import logo from '../../../public/logo.png'

import useStyles from './styles.js';

const Header = ({ setCoordinates }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const classes = useStyles();

  const onLoad = (autoC) => setAutocomplete(autoC);
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    console.log(lat, lng)
    setCoordinates({ lat, lng });
  };


  return (
    <AppBar style={{position: "fixed", background: "#FFB534"}}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title} style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <img style={{width: '40px'}} src={logo} alt="logo" />
          TrekTrend
        </Typography>
        <Box style={{ display: 'flex', alignItems: 'center'}}>
          <Typography variant="h7" style={{marginRight: '12px'}} className={classes.title}>
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;