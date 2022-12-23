const axios = require('axios')
const { apiGeneros} = process.env

const infoGeneros= async()=>{
    const gen= await axios.get(`${apiGeneros}`)
    const data= gen.data.results
   // console.log(data)
    return data
}

module.exports={
    infoGeneros,
}


