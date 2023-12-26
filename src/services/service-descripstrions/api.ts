import axios from "@/utils/axios";
import { ip3 } from "@/utils/ip";

export async function getServiceDescriptrions(id: any) {
  return axios.get(`${ip3}/initialize/clients/${id}/service-descriptions`);
}

export async function enableClientService(id: any) {
  return axios.put(`${ip3}/initialize/service-descriptions/${id}/enable`);
}

export async function disableClientService(payload: any) {
  console.log(payload);

  return axios.put(`${ip3}/initialize/service-descriptions/${payload?.id}/disable`, { disabled_notice: payload?.disabled_notice });
}
