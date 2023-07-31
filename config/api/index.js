let baseUrl = ''
export const authLogin = baseUrl + '/api/auth/login' // 登录
export const authRegister = baseUrl + '/api/auth/register' // 注册
export const checkToken = baseUrl + '/api/auth/checkToken' // 检查token
export const authLogout = baseUrl + '/api/auth/logout' // 退出登录
export const createCategory = baseUrl + '/api/category/createCategory' // 创建分类
export const updateCategory = baseUrl + '/api/category/updateCategory' // 修改分类
export const queryCategoryPage = baseUrl + '/api/category/queryCategoryPage' // 分页查询类型
export const deleteCategory = baseUrl + '/api/category/deleteCategory' // 删除类型


export const blogsQueryList = baseUrl + '/api/blogs/queryList'// 博客文章查询
export const fileUpload = baseUrl + '/api/file/upload' // 文件上传
