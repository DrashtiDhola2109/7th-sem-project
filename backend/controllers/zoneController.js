
const { Zone, Area,Route } = require('../models/Zoneschema');

async function createZone(req, res) {
    const zoneName = req.body.zoneName;
    const zoneId=req.body.zoneId;
    const newZone = new Zone({ zoneId,zoneName });
    await newZone.save()
        .then(() => {
            console.log("Zone added successfully!!!");
            res.status(201).json({ Data: { newZone }, Result: { Code: 201, Message: "Zone added successfully!", Cause: null } });
        })
        .catch((error) => {
            console.log("could not add zone" + " " + error.message);
            res.status(500).json({ Error: "Could not add zone" });

        })
}

async function deleteZone(req, res) {
    const zid = req.params.id;
    console.log(zid);
    await Zone.deleteOne({zoneId:zid})
        .then((deletedzone) => {
            if (!deletedzone) {
                // Category with the given ID was not found
                return res.status(404).json({ error: 'zone not found' });
            }


            console.log("zone deleted successfully!!!");
            res.status(200).json({ Result: { Code: 200, Message: "zone deleted successfully!", Cause: null } });


        })
        .catch((error) => {
            res.status(500).json({ error: 'Could not delete zone' });

        })
}

async function getZone(req, res) {
    try {
        const Zonedata = await Zone.find(); // Assuming you're using Mongoose

        if (!Zonedata) {
            return res.status(404).json({ error: 'No zone found' });
        }

        res.status(200).json(Zonedata);
    } catch (error) {
        console.error('Error fetching zone:', error);
        res.status(500).json({ error: 'Could not fetch zone' });
    }
}


async function updateZone(req, res) {
    const zid = req.params.id;
    const  zoneName = req.body.zoneName;
    console.log(zid);  
    try {
      const updatedZone = await Zone.updateOne({zoneId:zid},{zoneName:zoneName});
  
      if (!updatedZone) {
        return res.status(404).json({ error: 'zone not found' });
      }
  
      res.status(200).json({
        Data: { updatedZone },
        Result: { Code: 200, Message: 'Zone updated successfully!', Cause: null },
      });
    } catch (error) {
      console.error('Could not update zone:', error);
      res.status(500).json({ error: 'Could not update zone' });
    }
  }


  //Area

  async function CreateArea(req, res) {
    
    Zone.findOne({ zoneName: req.body.zoneName })
        .then(zone => {
            if (!zone) {
                res.json('zone not found');
            }
            else {
            
                const AreaName = req.body.AreaName;
                const AreaId = req.body.AreaId;
                const newarea = new Area({ AreaId,AreaName, zoneId: zone.zoneId});
                newarea.save();
                res.status(201).json({ Data: { newarea }, Result: { Code: 201, Message: "area added successfully!", Cause: null } });
            }
        })
        .catch(error => {
            console.error('could not add area' + " " + error.message);
        });
}
async function deletearea(req, res) {
    const aid = req.params.id;
    
    await Area.deleteOne({AreaId:aid})
        .then((deletedarea) => {
            if (!deletedarea) {
                return res.status(404).json({ error: 'area not found' });
            }
            console.log("area deleted successfully!!!");
            res.status(200).json({ Result: { Code: 200, Message: "area deleted successfully!", Cause: null } });


        })
        .catch((error) => {
            res.status(500).json({ error: 'Could not delete area' });

        })
}

async function getAllArea(req, res) {
    try {
        const areadata = await Area.find(); // Populate the 'categoryID' field
        const zoneName = await Zone.find
        if (!areadata) {
            return res.status(404).json({ error: 'No area found' });
        }

        // Now, map the subcategories to replace categoryID with the relative category name
        const areawithzone = areadata.map(area => {
            return {
                AreaId : area.AreaId,
                AreaName: area.AreaName,
                zoneName: area.zoneId.zoneName // Use 'categoryID' to access the populated category data
            };
        });

        res.status(200).json(areawithzone);
    } catch (error) {
        console.error('Error fetching area:', error);
        res.status(500).json({ error: 'Could not fetch area' });
    }
}

async function updatearea(req, res) {
    const aid = req.params.id;
    const { AreaName, ZoneName } = req.body;

    try {
        const zone = await Zone.findOne({ name: ZoneName });

        if (!zone) {
            return res.status(404).json({ error: 'zone not found' });
        }                                                             

        const updatearea = await Area.findByIdAndUpdate(
            aid,
            { AreaName, zoneId : zone.zoneId }, 
            { new: true } 
        );

        if (!updatearea) {
            return res.status(404).json({ error: 'area not found' });
        }

        // Include categoryName in the response
        const responseData = {
            updatearea,
            ZoneName, // Include the categoryName in the response
        };


        res.status(200).json({
            Data: responseData,
            Result: { Code: 200, Message: 'area updated successfully!', Cause: null },
        });
    } catch (error) {
        console.error('Could not update subcategory:', error);
        res.status(500).json({ error: 'Could not update subcategory' });
    }
}

//route

async function createRoute(req, res) {
    Area.findOne({ AreaNmae: req.body.Area })
        .then(area => {
            if (!area) {
                res.json('area not found');
            }
            else {
                const routename = req.body.RouteName;
                const newroute = new Route({ routename, AreaId: area.AreaId});
                newroute.save();
                res.status(201).json({ Data: { newroute }, Result: { Code: 201, Message: "route added successfully!", Cause: null } });
            }
        })
        .catch(error => {
            console.error('could not add route' + " " + error.message);
        });
}

async function deleteroute(req, res) {
    const rid = req.params.id;
    console.log(rid);
    await Route.findByIdAndDelete(rid)
        .then((deletedroute) => {
            if (!deletedroute) {
                
                return res.status(404).json({ error: 'route not found' });
            }


            console.log("route deleted successfully!!!");
            res.status(200).json({ Result: { Code: 200, Message: "route deleted successfully!", Cause: null } });


        })
        .catch((error) => {
            res.status(500).json({ error: 'Could not delete route' });

        })
}

async function getAllRoute(req, res) {
    try {
        const routedata = await Route.find().populate('AreaId'); // Populate the 'categoryID' field

        if (!routedata) {
            return res.status(404).json({ error: 'No route found' });
        }

        // Now, map the subcategories to replace categoryID with the relative category name
        const routewitharea = routedata.map(route => {
            return {
                _id: route._id,
                RouteName: route.RouteName,
                AreaName: route.AreaId.AreaName // Use 'categoryID' to access the populated category data
            };
        });

        res.status(200).json(routewitharea);
    } catch (error) {
        console.error('Error fetching route:', error);
        res.status(500).json({ error: 'Could not fetch route' });
    }
}

async function updateroute(req, res) {
    const rid = req.params.id;
    const { RouteName, AreaName } = req.body;

    try {
        // Find the corresponding Category document by categoryName
        const area = await Area.findOne({ name: AreaName });

        if (!area) {
            return res.status(404).json({ error: 'area not found' });
        }                                                             

        // Update the Subcategory with the new values and categoryId
        const updateroute = await Route.findByIdAndUpdate(
            rid,
            { RouteName, AreaId : area.AreaId }, // Update categoryId
            { new: true } // This option returns the updated subcategory
        );

        if (!updateroute) {
            return res.status(404).json({ error: 'route not found' });
        }

        // Include categoryName in the response
        const responseData = {
            updateroute,
            AreaName, // Include the categoryName in the response
        };


        res.status(200).json({
            Data: responseData,
            Result: { Code: 200, Message: 'route updated successfully!', Cause: null },
        });
    } catch (error) {
        console.error('Could not update route:', error);
        res.status(500).json({ error: 'Could not update route' });
    }
}

module.exports = {
    createZone,
    deleteZone,
    getZone,
    updateZone,
    CreateArea,
    deletearea,
    getAllArea, 
    updatearea,
    createRoute,
    deleteroute,
    getAllRoute,
    updateroute
};