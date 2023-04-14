import axios from "../config/axios";

export const getSymbols = () => axios.get<string[]>(`/symbols`);
export const getConvert = ({from, to, amount}: any) => axios.get(`/convert?from=${from}&to=${to}&amount=${amount}`);
export const createChangeRate = ({from, to, rate}: any) => axios.post(`/change-rate`);