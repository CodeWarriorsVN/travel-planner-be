import LocationsData from '../models/locationsdata.js';

export const getData = (req, res) => {
    LocationsData.find().then((data) => {
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

    LocationsData.findByIdAndUpdate(id, req.body, { useFindAndModify: false}).then((data) => {
        if (!data){
            res.status(404).send({ message: `Cannot update the location with id ${id}` });
        }else{
            res.send({message: "Update successfully"});
        }
    }).catch((err) => {
        res.status(500).send({ message: err.message || 'Error updating the location'})
    })

}

export const getLocationByProperty = (req, res) => {
    const {climax, population, terrain, lifestyle} = req.query;

    LocationsData.find({ climax: climax, population: population, terrain: terrain, lifestyle: lifestyle}).then((data) => {
        console.log(data);
        res.send(data);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message: err.message || "Invalid"});
    })
}

export const getLocationProperties = (req, res) => {
    res.send({ 
        climax: ['hot', 'cool', 'cold'],
        population: ['less density','great density'],
        terrain: ['mountainous','coastal','delta'],
        lifestyle: ['urban', 'countryside']
    })
}