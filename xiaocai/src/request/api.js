import { get, post } from './http'


const spqqlb = p => get('/spqqlb', p);
const login = p => post('/login', p)

export { spqqlb, login }