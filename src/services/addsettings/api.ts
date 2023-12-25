import axios from "@/utils/axios";
import {ip3} from "@/utils/ip";

export async function getSettingTable() {
  return axios.get(`${ip3}/initialize/system/anchor`);
}

export async function getSettingTimeTable() {
  return axios.get(`${ip3}/initialize/system/timestamping-services`);
}

export async function getSettingCATable() {
  return axios.get(`${ip3}/initialize/system/certificate`);
}

export async function getBackupTable() {
  return axios.get(`${ip3}/initialize/backups`);
}

export const apiUploadFileBackup = `${ip3}/initialize/backups/upload?ignore_warnings=false`;

export const apiUploadFileConfigAnchor = `${ip3}/initialize/system/anchor`;

export async function downloadFileBackupApi(fileName: string) {
  return axios.get(`${ip3}/initialize/backups/${fileName}/download`);
}

export async function deleteFileBackupApi(fileName: string) {
  return axios.delete(`${ip3}/initialize/backups/${fileName}`);
}

export async function backupConfigApi() {
  return axios.post(`${ip3}/initialize/backups/ext`);
}

export async function downloadConfigApi() {
  return axios.get(`${ip3}/initialize/system/anchor/download`);
}

export async function deleteTimestampingServicesApi(req: {name: string, url: string}) {
  return axios.post(`${ip3}/initialize/system/timestamping-services/delete`, req);
}

export async function getTimestapingServiceApi() {
  return axios.get(`${ip3}/initialize/timestamping-services`);
}

export async function addTimestapingServiceApi(req: {name: string, url: string}) {
  return axios.post(`${ip3}/initialize/system/timestamping-services`, req);
}
