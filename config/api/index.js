let baseUrl = ''
export const authLogin = baseUrl + '/api/auth/login' // 登录
export const authRegister = baseUrl + '/api/auth/register' // 注册
export const checkToken = baseUrl + '/api/auth/checkToken' // 检查token
export const authLogout = baseUrl + '/api/auth/logout' // 退出登录
export const createCategory = baseUrl + '/api/category/createCategory' // 创建分类
export const updateCategory = baseUrl + '/api/category/updateCategory' // 修改分类
export const queryCategoryPage = baseUrl + '/api/category/queryCategoryPage' // 分页查询类型
export const queryCategoryListAll = baseUrl + '/api/category/queryCategoryListAll' // 查询全部类型
export const deleteCategory = baseUrl + '/api/category/deleteCategory' // 删除类型
export const queryLabelPage = baseUrl + '/api/label/queryLabelPage' // 标签查询
export const queryLabelAll = baseUrl + '/api/label/queryLabelAll' // 标签查询所有
export const createLabel = baseUrl + '/api/label/createLabel' // 创建标签
export const updateLabel = baseUrl + '/api/label/updateLabel' // 修改标签
export const deleteLabel = baseUrl + '/api/label/deleteLabel' // 删除标签

export const queryBlogsListPage = baseUrl + '/api/blogs/queryBlogsListPage'// 博客文章查询
export const createBlogs = baseUrl + '/api/blogs/createBlogs'// 创建文章
export const deleteBlogs = baseUrl + '/api/blogs/deleteBlogs'// 删除文章
export const blogsQueryById = baseUrl + '/api/blogs/queryById'// 获取文章详情
export const blogsUpdateContent = baseUrl + '/api/blogs/updateContent'// 更新文章内容
export const publishBlogs = baseUrl + '/api/blogs/publishBlogs'// 发布文章
export const blogsUpdateOpen = baseUrl + '/api/blogs/updateOpen'// 发布文章

export const queryUserInfo = baseUrl + '/api/user/queryUserInfo'// 回去用户信息



export const fileUpload = baseUrl + '/api/file/upload' // 文件上传
