import axios from "@/utils/axios";
import {ip3} from "@/utils/ip";

export async function generateKeyApi() {
  return axios.get(`${ip3}/initialize/system/certificate`);
}

export async function exportCertApi() {
  return axios.get(`${ip3}/initialize/system/certificate/export`);
}

export async function getCertInfoApi() {
  return axios.get(`${ip3}/initialize/system/certificate`);
}



