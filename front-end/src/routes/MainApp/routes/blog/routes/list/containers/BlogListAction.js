import fetchPro from 'SRC/utils/fetchPro'

export function deleteBlogListItem(id) {
  return {
    type: 'BLOG@BLOG_LIST@DELETE_ITEM',
    id
  }
}

/**

  Async Actions

*/

export function loadBlogList() {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro('http://domain.com/api')
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: 'Ajax Response' }))
      .then(json => dispatch({
        type: 'BLOG@BLOG_LIST@LOAD',
        data: json
      }))
  )
}
