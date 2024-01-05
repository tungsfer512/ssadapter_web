import axios from "@/utils/axios";
import {ip3} from "@/utils/ip";

export async function getTokenApi() {
  return axios.get(`${ip3}/initialize/tokens`);
}

export async function logoutToken() {

}

export async function getCertServiceApi() {
  return axios.get(`${ip3}/initialize/certificate-authorities`);
}

export async function getCsrSubjectField() {
  return axios.get(`${ip3}/initialize/certificate-authorities`);
}

export const apiImportCert = `${ip3}/initialize/backups/upload?ignore_warnings=false`;

export async function deleteCsrApi(req: {keyId: string, csrId: string}) {
  return axios.delete(`${ip3}/initialize/keys/${req.keyId}/csrs/${req.csrId}`);
}

export async function getKeyDetailApi(keyId: string) {
  return axios.get(`${ip3}/initialize/keys/${keyId}`);
}

export async function deleteKeyApi(keyId: string) {
  return axios.delete(`${ip3}/initialize/keys/${keyId}`);
}

export async function renameKeyApi(keyId: string, reqBody: Object) {
  return axios.put(`${ip3}/initialize/keys/${keyId}`, reqBody);
}
