import LocationsData from '../models/locationsdata.js';

export const getData = (req, res) => {
    LocationsData.find().exec().then((data) => {
        res.send(data);
    })
    .catch((err) => { res.status(500).send({message: err.message || "Error occured while retrieving "});
 });
}
export const patchLocations = (req, res) => {
    if (!req.body){
        return res
        .status(400)
        .send({ message: 'Data required'})
    }

    const id = req.params.id;

    LocationsData.findByIdAndUpdate(id, req.body, { useFindAndModify: false}).exec().then((data) => {
        if (!data){
            res.status(404).send({ message: `Cannot update the location with id ${id}` });
        }else{
            res.send(data);
        }
    }).catch((err) => {
        res.status(500).send({ message: err.message || 'Error updating the location'})
    })

}

export const getLocationByProperty = (req, res) => {
    const climax = req.params.climax;
    const population = req.params.population;
    const terrain= req.params.terrain;
    const lifestyle = req.params.lifestyle;

    LocationsData.findOne(req.body).exec().then((data) => {
        if (population != population.enum && climax != climax.enum && terrain != terrain.enum && lifestyle != lifestyle.enum) {
        res.status(404).send({message: 'Invalid property'});
        }else{
        res.send(data);
        }
    })
}