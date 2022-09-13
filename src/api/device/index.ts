import { request } from '@/utils/request';

export function getInterface() {
  return request<API.TableListResult<API.OnlineUserListResult>>({
    url: '/cgi-bin/ComManager.cgi?loadAllCom',
    method: 'get',
  });
}
