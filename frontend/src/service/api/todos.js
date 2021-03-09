import axios from 'axios';

export const get = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

    return response.data
}
