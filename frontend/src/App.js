import React, { useEffect } from "react";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import Register from "./components/Register";
import "./app.css";
const App = () => {
  const [currentUser,setCurrentUser] = useState("");
  const [pins, setpins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setnewPlace] = useState(null);
  const[title,setTitle]=useState(null)
  const[desc,setDesc]=useState(null)
  const[rating,setRating]=useState(0)
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 4,
  });
  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setpins(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPins();
  }, []);
  const handleMarkerClick = (id,lat,long) => {
    setCurrentPlaceId(id);
    setViewport({...viewport,latitude:lat,longitude:long})
  };
  const handleAddClick=(e)=>{
    const [longitude,latitude]=e.lngLat
    setnewPlace({longitude,latitude})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const newPin={
      username:currentUser,
      title,
      description:desc,
      rating,
      latitude:newPlace.latitude,
      longitude:newPlace.longitude
    }
    try{
      const res=await axios.post('/pins',newPin)
      setpins([...pins,res.data])
      setnewPlace(null)
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        onDblClick={handleAddClick}
      >
        {pins.map((p) => (
          <>
            <Marker
              latitude={p.latitude}
              longitude={p.longitude}
              offsetLeft={-viewport.zoom * 3.5}
              offsetTop={-viewport.zoom * 7}
            >
              <Room
                style={{
                  fontSize: viewport.zoom * 7,
                  color: p.username === currentUser ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id,p.latitude,p.longitude)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                key={p._id}
                latitude={p.latitude}
                longitude={p.longitude}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.description}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Creater by <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace&&
            <Popup
            latitude={newPlace.latitude}
            longitude={newPlace.longitude}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => setnewPlace(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" placeholder="enter a title" onChange={(e)=>setTitle(e.target.value)}/>
                <label>Review</label>
                <textarea placeholder="Say something about this place" onChange={(e)=>setDesc(e.target.value)}/>
                <label>Rating</label>
                <select onChange={(e)=>setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">Add Pin</button>
              </form>
            </div>
          </Popup>
        }
        {currentUser?(<button className="button logout">Log Out</button>):(
            <div className="buttons">
            <button className="button login">Log In</button>
            <button className="button register">Register</button>
          </div>
        )}
        <Register/>
      </ReactMapGL>
    </div>
  );
};
export default App;
