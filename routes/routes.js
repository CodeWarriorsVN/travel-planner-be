import express from "express";
// import fs from 'fs';
// import LocationsData from "../models/locationsdata.js";
// import data from 'hanhchinhvn/dist/tinh_tp.json' assert {type: 'json'}
import { getData, patchLocations, getLocationByProperty } from "../controller/controller.js";


const router = express.Router();

// router.post('/', (req, res) => {
//     //const data = JSON.parse(fs.readFileSync('../node_modules/hanhchinhvn/dist/tinh_tp.json'));
//     try {
//         Object.entries(data).forEach(async([_, value]) => {
//             const location = new LocationsData({
//                 name: value.name,
//                 slug: value.slug,
//                 type: value.type,
//                 name_with_type: value.name_with_type,
//                 code: value.code
//             })
//             const saveData = await location.save();
//             console.log(value)
//         })
//         res.send("123");
//     } catch (error) {
//         console.log('error', error)
//     }
// })

router.get('/', getData);

router.get('/properties', getLocationByProperty);

router.patch('/:id', patchLocations);

export default router