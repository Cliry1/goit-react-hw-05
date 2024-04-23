import axios from 'axios';


export default async function fetchItems(path, query={}){
  axios.defaults.baseURL = 'https://api.themoviedb.org/3';
  const options = {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OThjMzRhZTE2NDkyMDAwNDNhMjQ5MGQ0NDVhZWMxMCIsInN1YiI6IjY2MjU0MjEyMDdmYWEyMDE4Nzk5ZGZiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xX08rrHZEluw7lSdOOT4jUm5q948xmjFtumKuGPE3qY'
    },
    params:{query}
  };
  const response = await axios.get(path, options);
  return response.data;

}
