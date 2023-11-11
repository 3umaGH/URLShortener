import axios from 'axios';
import { CreateNewLinkProps } from '../constants';

const API_BASE_URL = import.meta.env.VITE_APP_API;

export const createShortLink = async (formData: CreateNewLinkProps) => {
    return await axios.post(`${API_BASE_URL}/action`, formData);
};