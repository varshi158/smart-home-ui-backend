import Device  from "../models/Device.js";
const devices = [];

export const getAllDevices = async (req, res) => {
    try {
      const devices = await Device.find();
      return res.status(200).json(devices);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send();
    }
  };

export const getDevice = async (req, res) => {

    try{
      const {id} = req.params;
      //const device = devices.find( (el) => el.id === parseInt(id));
    
      // if (!device) {
      //   return res.status(404).send();
      // }

      const device = await Device.findById(id);
      if (!device) {
        return res.status(404).json(device);
      }
      return res.status(200).json(device);
    }
    catch (error) {
      console.log(error);
      res.status(500).send();
    }
  };


export const createDevice =  async (req, res) => {

    try {
        const device = req.body;
        // const found = devices.find((el) => el.id === parseInt(device.id));
        // if (found) {
        //     return res.status(400).send();
        // }
        // devices.push(device);
        await Device.create(device);
        return res.status(201).send();
    }
    catch(error) {
        console.log(error);
        res.status(500).send();
    }
  };
  
export const deleteDevice = async (req, res) => {
    try {
      const { id } = req.params;
  
      // const deviceIndex = devices.findIndex( (el) => el.id === parseInt(id));
      
      //   if (deviceIndex === -1) {
      //     return res.status(404).send();
      //   }
        await Device.findByIdAndDelete(id);
        //devices.splice(deviceIndex, 1); 
        return res.status(204).send(); 
    }
    catch (error) {
      console.log(error);
      res.status(500).send();
    }
  };

export const fullyUpdateDevice = async (req, res) => {
    try {
      const { id } = req.params;
  
      const device = req.body;
      //const found = devices.find((el) => el.id === parseInt(id));
      const found = Device.findById(id);
      if(!found) {
        return res.status(404).send();
      }
      // found.name = device.name;
      // found.state = device.state;
      // found.location = device.location;

      const fullyUpdatedDevice = await Device.findByIdAndUpdate(id, {name: device.name, state: device.state, image: device.image, location: device.location});
      return res.status(201).send();
    }
    catch (error) {
      console.log(error);
      res.status(500).send();
    }
  };

export const partiallyUpdateDevice = async(req, res) => {
    try {
      const { id } = req.params;
  
      const data = req.body;
      //const found = devices.find((el) => el.id === parseInt(id));
      const found = Device.findById(id);
      if(!found) {
        return res.status(404).send();
      }
      
      //found.state = data.state;
      const partiallyUpdatedDevice = await Device.findByIdAndUpdate(id, {
        state: data.state,
      });
      return res.status(201).send();
    }
    catch (error) {
      console.log(error);
      res.status(500).send();
    }
  };