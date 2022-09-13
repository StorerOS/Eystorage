import request from '@/utils/request'

// get project list
export function getProjectList(data) {
  return request({
    url: '/project/list',
    method: 'post',
    data
  })
}

// create project
export function createProject(data) {
  return request({
    url: '/project/create',
    method: 'post',
    data
  })
}

// edit project
export function editProject(data) {
  return request({
    url: '/project/edit',
    method: 'post',
    data
  })
}

// delete project
export function deleteProject(data) {
  return request({
    url: '/project/delete',
    method: 'post',
    data
  })
}
