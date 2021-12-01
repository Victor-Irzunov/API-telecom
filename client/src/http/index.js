import axios from "axios";


const getDataServer = async () => {
    const {data} = await axios.get('http://localhost:5000/')
    return data
}
export default getDataServer
