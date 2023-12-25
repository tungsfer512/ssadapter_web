import axios from "@/utils/axios";
import {ip3} from "@/utils/ip";

export async function getMemberClasses() {
  return axios.get(`${ip3}/initialize/member-classes`);
}

export async function getTokenInfo() {
  return axios.get(`${ip3}/initialize/tokens`);
}
