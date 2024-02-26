"use strict"

import express from "express";

// web service called app
const app = express();
app.use(express.json());

const devices = [];

// getting all the devices
app.get("/devices", (req, res) => {
  try {
    return res.status(200).json(devices);
  }
  catch (error) {
      console.log(error);
      return res.status(500).send();
  }
});

// getting a single device
app.get("/devices/:id", (req, res) => {

  try{
    const {id} = req.params;
    const device = devices.find( (el) => el.id === parseInt(id));
  
    if (!device) {
      return res.status(404).send();
    }
    return res.status(200).json(device);
  }
  catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

// creating a device
app.post("/devices", (req, res) => {

  // taking body as an object
  const device = req.body;
  devices.push(device);

  // send the created device
  return res.status(201).send();

  // prints what is coming in
  //console.log(device);
  //res.status(200).json(devices);
});

// delete a device
app.delete("/devices/:id", (req, res) => {
  try {
    const { id } = req.params;

    const deviceIndex = devices.findIndex( (el) => el.id === parseInt(id));
    
      if (deviceIndex === -1) {
        return res.status(404).send();
      }
      
      devices.splice(deviceIndex, 1); 
      return res.status(204).send(); 
  }
  catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

// update a device
app.put("/devices/:id", (req, res) => {
  try {
    const device = req.body;
    const found = devices.find((el) => el.id === parseInt(id));
    if(!found) {
      return res.status(404).send();
    }
    found.name = device.name;
    found.state = device.state;
    found.location = device.location;;
    return res.status(201).send();
  }
  catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

