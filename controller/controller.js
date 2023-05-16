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

export const searchLocations = async(req, res) => {
    try {
        const page = parseInt(req.query.page) - 1||0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || "name";
        let population = req.query.population || "all";
        let terrain = req.query.terrain || "all";
        let climax = req.query.climax || "all";
        let lifestyle = req.query.lifestyle || "all";

        const populationOptions = [
            "less density",
            "great density"
        ]
        const climaxOptions = [
            "hot",
            "cool",
            "cold"
        ]
        const terrainOptions = [
            "delta",
            "coastal",
            "mountainous"
        ]
        const lifestyleOptions = [
            "urban",
            "countryside"
        ]

        population === "all"
        ?(population = [...populationOptions])
        :(population = req.query.population.split(","));
        climax === "all"
        ?(climax = [...climaxOptions])
        :(climax = req.query.climax.split(","));
        terrain === "all"
        ?(terrain = [...terrainOptions])
        :(terrain = req.query.terrain.split(","));
        lifestyle === "all"
        ?(lifestyle = [...lifestyleOptions])
        :(lifestyle = req.query.lifestyle.split(","));
        req.query.sort?(sort = req.query.sort.split(",")):(sort = [sort]);

        let sortBy = {}

        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        }else {
            sortBy[sort[0]] = "asc";
        }

        const data = await LocationsData.find({name: {$regex: search, $options: "i"}})
        .where("population").in([...populationOptions])
        .where("climax").in([...climaxOptions])
        .where("terrain").in([...terrainOptions])
        .where("lifestyle").in([...lifestyleOptions])
        .sort(sortBy)
        .skip(page * limit)
        .limit(limit);

        const total = await LocationsData.countDocuments({
            population: {$in: [...populationOptions]},
            climax: {$in: [...climaxOptions]},
            terrain: {$in: [...terrainOptions]},
            lifestyle: {$in: [...lifestyleOptions]},
            name: {$regex: search, $options: "i"},
        })

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            population: populationOptions,
            climax: climaxOptions,
            terrain: terrainOptions,
            lifestyle: lifestyleOptions,
            data
        }
        res.status(200).send(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({error: true, message: "Internal Server Error"})
    }
}