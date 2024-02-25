"use strict"

import express from "express";

// web service called app
const app = express();
app.use(express.json());

const devices = [];

// get request - asking for resource
app.get("/devices", (req, res) => {
  return res.status(200).json(devices);
});

// get request - asking for device from a particular id
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

// post request
app.post("/devices", (req, res) => {

  // taking body as an object
  const device = req.body;
  devices.push(device);

  // send the created device
  return res.status(201).send();

  // prints what is coming in
  //console.log(device);
  //res.status(200).json(devices);
})

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

