const findObject = async (req, res)=>{
    try{
        let inputArray = req.body;
        let filteredArray = inputArray.filter(data=>(data.id != null && data.code == "025" && data.name == "test"))
        await filterArray(filteredArray);
        res.status(200).json({filteredArray});
    }catch(error){
        console.log("error in find object ", error);
    }
}

const findObjectFromDb = async (req, res)=>{
    try{       

        let inputArray = await global.UserDetails.find().toArray();
        let filteredArray = inputArray.filter(data=>(data.id != null && data.code == "025" && data.name == "test"))
        await filterArray(filteredArray);
        res.status(200).json({filteredArray});
    }catch(error){
        console.log("error in find object ", error);
    }
}

const filterArray = async (filteredArray)=>{
    try{
    console.log(filteredArray)
    let resp = await global.UserDetails.find().toArray();
    console.log(resp)

    }catch(error){
        console.log("error in filterArray ", error);
    }
}

const createObject = async(req, res)=>{
    try{
        
        let resp = await global.UserDetails.insertOne(req.body);
        res.status(200).json(resp);

    }catch(error){
        console.log("error in createObject ", error);
    }
}


module.exports = {findObject, createObject, findObjectFromDb}