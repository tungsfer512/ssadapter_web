import axios from "@/utils/axios";
import { ip3 } from "@/utils/ip";

export async function getServiceDescriptrions(id: any) {
  return axios.get(`${ip3}/initialize/clients/${id}/service-descriptions`);
}

export async function enableClientService(id: any) {
  return axios.put(`${ip3}/initialize/service-descriptions/${id}/enable`);
}

export async function disableClientService(payload: any) {
  return axios.put(`${ip3}/initialize/service-descriptions/${payload?.id}/disable`, { disabled_notice: payload?.disabled_notice });
}

export async function editServiceDescriptrions(payload: any) {
  return axios.patch(`${ip3}/initialize/service-descriptions/${payload?.id}`, {
    ...payload,
    "adapter_data": {
      "service_description": {
        "description": payload?.descriptiondescription || "Mo ta service description"
      },
      "service": {
        "description": payload?.description || "Mo ta service"
      }
    }
  });
}

export async function deleteServiceDescriptrions(payload: any) {
  return axios.delete(`${ip3}/initialize/service-descriptions/${payload?.id}`);
}

export async function AddClientServiceREST(payload: any) {
  const data = {
    url: payload?.url,
    type: payload?.type,
    rest_service_code: payload?.rest_service_code,
    "adapter_data": {
      "service_description": {
        "description": payload?.descriptiondescription || "Mo ta service description"
      },
      "service": {
        "description": payload?.description || "Mo ta service"
      }
    }
  };

  return axios.post(`${ip3}/initialize/clients/${payload.id}/service-descriptions`, data);
}

export async function AddClientServiceWSDL(payload: any) {
  const data = {
    url: payload?.url,
    type: payload?.type,
    "adapter_data": {
      "service_description": {
        "description": payload?.descriptiondescription || "Mo ta service description"
      },
      "service": {
        "description": payload?.description || "Mo ta service"
      }
    }
  };

  return axios.post(`${ip3}/initialize/clients/${payload.id}/service-descriptions`, data);
}


export async function getInforService(req: { clientId: string, serviceId: string }) {
  return axios.get(`${ip3}/initialize/services/${req.serviceId}`);
}

export async function getAccessRightsListApi(req: { clientId: string, serviceId: string }) {
  return axios.get(`${ip3}/initialize/services/${req.serviceId}/service-clients`);
}



export async function editSerciceById(req: any) {
  console.log(req);
  const payload = {
    "url": req.url,
    "timeout": Number(req.timeout),
    "ssl_auth": false,
    "timeout_all": false,
    "url_all": false,
    "ssl_auth_all": false,
    "ignore_warnings": false,
    "adapter_data": {
      "description": req.description || "Mo ta service",
    }
  };
  return axios.patch(`${ip3}/initialize/services/${req.serviceId}`, payload);
}

export async function getAllServiceApi(req: { clientId: string }) {
  return axios.get(`${ip3}/initialize/services/CS%3AGOV%3AMANAGESS2MC%3AABCABC/service-descriptions`);
}

export async function xroadInstances() {
  return axios.get(`${ip3}/initialize/xroad-instances`);
}

export async function memberClasses() {
  return axios.get(`${ip3}/initialize/member-classes`);
}

export async function memberClassesById(id: string) {
  return axios.get(`${ip3}/initialize/member-classes/${id}`);
}

export async function serviceClientCandidates(payload: any) {
  const id = payload?.id;
  delete payload?.id;
  return axios.get(`${ip3}/initialize/clients/${id}/service-client-candidates`, {
    params: {
      ...payload
    }
  });
}


export async function addServiceClientOfService(payload: any) {
  const id = payload?.serviceId;
  console.log(payload);

  delete payload?.serviceId;
  return axios.post(`${ip3}/initialize/services/${id}/service-clients`, payload);
}

export async function deleteAccessRight(req: { clientId: string, serviceId: string, data: any }) {
  console.log(req);

  return axios.post(`${ip3}/initialize/services/${req.serviceId}/service-clients/delete`, req.data);
}

export async function deleteEndpoint(id: string) {

  return axios.delete(`${ip3}/initialize/endpoints/${id}`);
}

export async function editEndpoint(id: string) {

  return axios.patch(`${ip3}/initialize/endpoints/${id}`);
}


export async function getEndpointsById(serviceId: string) {
  return axios.get(`${ip3}/initialize/services/${serviceId}`);
}

export async function addEndpoint(payload: any) {
  const id = payload?.serviceId;
  console.log(payload);

  delete payload?.serviceId;

  const data = {
    "service_code": payload?.service_code,
    "method": payload?.method,
    "path": payload?.path,
    "adapter_data": {
      "name": payload?.name,
      "description": payload?.description,
      "input_description": payload?.input_description,
      "output_description": payload?.output_description,
    }
  }
  return axios.post(`${ip3}/initialize/services/${id}/endpoints`, payload);
}

export async function getAccessRightsListEndpoints(id: string) {
  return axios.get(`${ip3}/initialize/endpoints/${id}/service-clients`);
}
export async function deleteAccessRightEndpoints(req: { endpointId: string, data: any }) {
  return axios.post(`${ip3}/initialize/endpoints/${req.endpointId}/service-clients/delete`, req.data);
}
export async function addAccessRightEndpoints(payload: any) {
  console.log(payload);

  const id = payload?.endPointId;
  delete payload?.endPointId;
  return axios.post(`${ip3}/initialize/endpoints/${id}/service-clients`, {
    items: payload?.items?.items
  });
}
