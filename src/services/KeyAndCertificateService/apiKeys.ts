import axios from "@/utils/axios";
import {ip3} from "@/utils/ip";

export async function getAllApiKeys() {
    return axios.get(`${ip3}/initialize/api-keys`);
}

export async function editRoles(keyId: number, req: {roles: any[]}) {
    return axios.put(`${ip3}/initialize/api-keys/${keyId}`, req);
}

export async function revokeKeyApi(keyId: number) {
    return axios.delete(`${ip3}/initialize/api-keys/${keyId}`);
}

export async function createApiKeys(req: {roles: any[]}) {
  return axios.post(`${ip3}/initialize/api-keys`, req);
}
