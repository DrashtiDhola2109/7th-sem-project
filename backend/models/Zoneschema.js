const mongoose = require('mongoose');

const zoneschema = new mongoose.Schema({
    
    //zoneId:{type:Number,require:true,unique:true},
    zoneName: { type: String, required: true, unique: true }
    
    // Add other fields as needed
});

// zoneschema.pre('save', async function (next) {
//     if (!this.zoneId) {
//         try {
//             const lastzoneid = await Zone.findOne({}, {}, { sort: { zoneId: -1 } });
//             this.zoneId = (lastzoneid && lastzoneid.zoneId) || 0;
//             this.zoneId++; // Increment the value for the new category
//         } catch (error) {
//             console.error('Error getting last id:', error);
//         }
//     }
//     next();
// });

const Areaschema = new mongoose.Schema({
    // AreaId:{type:Number,require:true,unique:true},
    AreaName: { type: String, required: true, unique: true },
    
    zoneId: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone', required: true },
    
});

// Areaschema.pre('save', async function (next) {
//     if (!this.AreaId) {
//         try {
//             const lastid = await Area.findOne({}, {}, { sort: { AreaId: -1 } });
//             this.AreaId = (lastid && lastid.AreaId) || 0;
//             this.AreaId++; // Increment the value for the new category    
//         } catch (error) {
//             console.error('Error getting last id:', error);
//         }
//     }
//     next();
// });

const Routeschema = new mongoose.Schema({
    RouteName: { type: String, required: true, unique: true },
    
    AreaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Area', required: true },
    
});
const Zone = mongoose.model('Zone', zoneschema);

const Area = mongoose.model('Area', Areaschema);

const Route = mongoose.model('Route', Routeschema);

module.exports = { Zone,  Area , Route };
