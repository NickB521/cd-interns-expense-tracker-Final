import axios from 'axios';

const PROGRAMS_BASE_API_URL = 'http://localhost:8080/programs';

export function getAllPrograms(){
    return axios.get(PROGRAMS_BASE_API_URL);
}

export function createProgram(program){
    return axios.post(PROGRAMS_BASE_API_URL,program);
}

export function getProgramById(id){
    return axios.get(`${PROGRAMS_BASE_API_URL}/${id}`);
}

export function updateProgram(id, program){
    return axios.put(`${PROGRAMS_BASE_API_URL}/${id}`, program);
}

export function deleteProgram(id){
    return axios.delete(`${PROGRAMS_BASE_API_URL}/${id}`);
}
