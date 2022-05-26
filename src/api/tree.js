import request from '@/utils/request'

export function getCitTreeAPI () {
  return request({
    url: '/cit/tree',
    method: 'get'
  })
}
