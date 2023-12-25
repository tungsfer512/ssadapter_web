import axios from "@/utils/axios";
import {ip3} from "@/utils/ip";

export interface IAddSubSystemReq {
  client: {member_class: string, member_code: string, member_name: string, subsystem_code: string},
  ignore_warnings: boolean
}

export async function getClientTable() {
  return axios.get(`${ip3}/initialize/clients`);
}

export async function getListClient() {
  return axios.get(`${ip3}/initialize/clients?exclude_local=true&internal_search=false&show_members=false&instance=CS`);
}

export async function addSubSystem(req: IAddSubSystemReq) {
  return axios.post(`${ip3}/initialize/clients`, req);
}

export async function getMemberListApi(req: {clientId: string, serviceId: string}) {
  return axios.get(`${ip3}/initialize/clients/${req.clientId}/service-clients/${req.serviceId}`);
}

export async function getAccessRightsListApi(req: {clientId: string, serviceId: string}) {
  return axios.get(`${ip3}/initialize/clients/${req.clientId}/service-clients/${req.serviceId}/access-rights`);
}

export async function deleteAccessRight(req: {clientId: string, serviceId: string, data: any}) {
  return axios.post(`${ip3}/initialize/clients/${req.clientId}/service-clients/${req.serviceId}/access-rights/delete`, req.data);
}

export async function getAllServiceApi(req: {clientId: string}) {
  return axios.get(`${ip3}/initialize/clients/CS%3AGOV%3AMANAGESS2MC%3AABCABC/service-descriptions`);
}
