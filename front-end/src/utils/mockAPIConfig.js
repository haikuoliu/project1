/**
 * mockAPIConfig = {
 * 	rules: [{
 * 		url: RegExp 检测请求链接是否match,
 * 	}]
 * }
 */

/* eslint-disable quote-props, quotes */
export const mockAPIConfig = {
  enabled: true,
  rules: [
    {
      // 返回结果－直接返回
      enabled: true,
      url: new RegExp('http://host.name.com/[\\d]+/[\\w+]'),
      type: 'normal',
      dalay: 1000,
      response: {
        status: 'succ',
        result: []
      }
    }, {
      // 返回结果－函数返回
      enabled: true,
      url: new RegExp('http://host.name.com/[\\d]+/[\\w+]'),
      type: 'normal',
      delay: 1000,
      response: (url, config) => {
        return { status: 'succ', result: [] }
      }
    }, {
      // 抛出异常－函数返回
      enabled: false,
      url: new RegExp('http://host.name.com/[\\d]+/[\\w+]'),
      type: 'error',
      delay: 1000,
      error: 'Error Message...'
    }
  ]
}

export default mockAPIConfig
