import axios from "@/utils/axios";
import {ip3} from "@/utils/ip";

export async function getCertificateById(hash: string) {
  return axios.get(`${ip3}/initialize/token-certificates/${hash}`);
}

export async function activeCertificateById(hash: string) {
  return axios.put(`${ip3}/initialize/token-certificates/${hash}/activate`);
}

export async function disableCertificateById(hash: string) {
  return axios.put(`${ip3}/initialize/token-certificates/${hash}/disable`);
}

export async function deleteCertificateById(hash: string) {
  return axios.delete(`${ip3}/initialize/token-certificates/${hash}`);
}
