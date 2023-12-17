import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import { CssBaseline, Grid } from '@material-ui/core';
import { getPlacesData } from './api'


function App() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState({});


  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(()=> {
    const filteredPlaces = places.filter((place) => Number(place.rating) > rating);
    setFilteredPlaces(filteredPlaces);
  },[rating])

  useEffect(() => {
    if(bounds?.sw, bounds?.ne){
    setIsLoading(true)
    getPlacesData(type, bounds?.sw, bounds?.ne)
      .then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0))
        setFilteredPlaces([])
        setIsLoading(false)
      })
    }
  }, [type, coordinates, bounds])


  return (
    <>
      <CssBaseline></CssBaseline>
      <Header setCoordinates={setCoordinates}></Header>
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={ filteredPlaces.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={ filteredPlaces.length ? filteredPlaces : places}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App
