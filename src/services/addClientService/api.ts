import axios from "@/utils/axios";
import {ip3} from "@/utils/ip";

export async function getMemberClasses() {
  return axios.get(`${ip3}/initialize/member-classes`);
}

export async function getTokenInfo() {
  return axios.get(`${ip3}/initialize/tokens`);
}

export async function csrSubjectField(req: {certService: any, keyUsageType: any, memberId: any, isNewMember: boolean}) {
  return axios.get(`${ip3}/initialize/certificate-authorities/${req.certService}/csr-subject-fields?key_usage_type=${req.keyUsageType}&member_id=${req.memberId}&is_new_member=${req.isNewMember}`);
}

export async function registerClient(req: any) {
  return axios.post(`${ip3}/initialize/tokens/0/keys-with-csrs`, req);
}

export async function getListClientApi(req?: any) {
  return axios.get(`${ip3}/initialize/clients?exclude_local=true&internal_search=false&show_members=false&instance=CS`);
}

