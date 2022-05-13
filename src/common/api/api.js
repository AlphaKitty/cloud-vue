// 后台接口api
// 暂未使用  deleteAction,putAction,httpAction
import {getAction, postAction} from '@/common/api/method'

// 首页接口
// 首页banner
const getByPrimary = (params) => getAction("/article/getbyprimary", params);
// 首页标签
const getTagAll = (params) => getAction("/tag/all", params);
// 首页文章列表
const getArticleList = (params) => getAction("/article/pagearticlesbycreateat", params);
//
const getArticlesByInclude = (params) => getAction("/article/pagearticlesbyincludeat", params);
// 首页热门讨论
const getHotCommentArticles = (params) => getAction("/article/hotcommentarticles", params);
// 首页单个标签
const getByTagId = (params) => getAction("/article/getbytagid", params);

// 精选

// 文章
// 文章详情
const getById = (params) => getAction("/article/getbyid", params);
// 评论列表
const getRankedComments = (params) => getAction("/comment/pagerankedcomments", params);
// 评论保存
const commentSave = (params) => postAction("/comment/save", params);

// 专题
const getTopicTagsList = (params) => getAction("/tag/listtopictags", params);
// 专题详情
const getTopicArticles = (params) => getAction("/tag/pagetopicarticles", params);
// 标签详情
const getTagArticles = (params) => getAction("/tag/pagetagarticles", params);

// 私藏
const getMyAllArticle = (params) => getAction("/article/myallarticle", params);

// 榜单

// 社区

// 留言
// 查询留言
const getFeedbackList = (params) => getAction("/feedback/list", params);
// 添加留言
const getAddFeedback = (params) => postAction("/feedback/add", params);

// 设置

// 友链

// 搜索
const search = (params) => postAction("/es/get", params);

// 登录
const login = (params) => postAction("/user/login", params);
// 注册
const signup = (params) => postAction("/user/signup", params);


export {
    getByPrimary,
    getTagAll,
    getArticleList,
    getHotCommentArticles,
    getArticlesByInclude,
    getByTagId,
    getById,
    getRankedComments,
    commentSave,
    getTopicTagsList,
    getTopicArticles,
    getTagArticles,
    getMyAllArticle,
    getFeedbackList,
    getAddFeedback,
    search,
    login,
    signup,
}
