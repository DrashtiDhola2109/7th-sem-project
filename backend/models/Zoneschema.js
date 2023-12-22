const mongoose = require('mongoose');

const zoneschema = new mongoose.Schema({
    zoneName: { type: String, required: true, unique: true }
    
    // Add other fields as needed
});
const Areaschema = new mongoose.Schema({
    AreaName: { type: String, required: true, unique: true },
    
    zoneId: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone', required: true },
    
});

const Routeschema = new mongoose.Schema({
    RouteName: { type: String, required: true, unique: true },
    
    AreaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Area', required: true },
    
});
const Zone = mongoose.model('Zone', zoneschema);

const Area = mongoose.model('Area', Areaschema);

const Route = mongoose.model('Route', Routeschema);

module.exports = { Zone,  Area , Route };
