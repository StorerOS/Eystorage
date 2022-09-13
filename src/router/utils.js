import path from 'path'

export function getCompletePath(routes) {
  const completePathList = []
  const searchPath = (routes, parentRoute) => {
    routes.forEach(route => {
      const pathstr = parentRoute && path.join(parentRoute.completePath, route.path) || route.path
      if (route.children) {
        route.completePath = pathstr
        searchPath(route.children, route)
      } else {
        completePathList.push(pathstr)
      }
    })
  }
  searchPath(routes)
  return completePathList
}
