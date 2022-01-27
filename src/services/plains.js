import { getRequest } from "../utils/api";

export const plainsAPI = {
  index: (page, offset) => getRequest(`operations?page=${page}&offset=${offset}`),
  show: (source, destination, timer_minutes, plain) => 
		getRequest(`operation/check?source=${source}&destination=${destination}&timer_minutes=${timer_minutes}&plain=${plain}`)
}