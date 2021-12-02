import axios from "axios";


export const getDataServer = async (page, limit = 5) => {
    const {data} = await axios.get('http://localhost:5000/',
        {
            params: {
                page, limit
            }
        }
        );
    return data;
};

export const getSelectData = async (option) => {
    const {data} = await axios.get('http://localhost:5000/select',
        {
            params: {
                option
            }
        }
    );
    return data;
};

export const getSearchData = async (searchData) => {
    const {data} = await axios.get('http://localhost:5000/search',
        {
            params: {
                searchData
            }
        }
    );
    return data;
};
