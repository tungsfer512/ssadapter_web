import axios from "@/utils/axios";
import {ip3} from "@/utils/ip";

export async function getSubsystemInfoService(id: string) {
  return axios.get(`${ip3}/initialize/clients/${id}`);
}

export async function getCertificateDataService(id: string) {
  return axios.get(`${ip3}/initialize/clients/${id}/sign-certificates`);
}

export async function deleteClientsById(id: string) {
  return axios.delete(`${ip3}/initialize/clients/${id}`);
}

export async function unregisterClientsById(id: string) {
  return axios.put(`${ip3}/initialize/clients/${id}/unregister`);
}

export async function getAllServiceClient(id: string) {
  return axios.get(`${ip3}/initialize/clients/${id}/service-clients`);
}

export async function getMemberTableApi(clientId:  string) {
  return axios.get(`${ip3}/initialize/clients/${clientId}/service-client-candidates`);
}

export async function getServiceDescription(clientId:  string) {
  return axios.get(`${ip3}/initialize/clients/${clientId}/service-descriptions`);
}

