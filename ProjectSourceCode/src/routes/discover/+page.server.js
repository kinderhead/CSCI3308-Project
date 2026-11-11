import axios from 'axios';
import qs from 'qs';

export async function load({ url }) {
    let search = url.searchParams.get('search')?.toString();

    if(!search||!search.match("^[a-zA-Z0-9 ]+$")||search.length<3){
        return{
            results: {data: []},
            search: search
        }
    }

    let data = qs.stringify({
        'grant_type': 'client_credentials',
        'scope': 'product.compact'
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.kroger.com/v1/connect/oauth2/token',
        headers: {
            'Authorization': 'Basic ' + process.env.BASE64_KEY,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };
    const token = (await axios.request(config)).data.access_token;

    config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.kroger.com/v1/products?filter.term=' + search + '&filter.limit=20',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token
        },
        data: data
    };
    const response = (await axios.request(config))
    return {
        results: response.data,
        search: search
    };
}
