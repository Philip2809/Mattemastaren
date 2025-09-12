import axios from 'axios'
declare module 'axios' {
  export interface AxiosRequestConfig {
    loadingString?: string;
    loadingId?: string;
  }
}
const httpClient = axios.create({
  baseURL: 'http://localhost:3000'
})

export { httpClient }
