/****** create file by codeGen ******/
import BaseService, { postFn, getFn } from '../magicPackages/BaseService';
import { get, post } from '@/service/xhr/fetch';
import { message } from 'antd';

class CaseManageService extends BaseService {
  constructor() {
    super('/user', {
      $getDataList: async (params) => {
        let { currentPage, ...restParams } = params || {};
        restParams.pageNum = currentPage;
        let res = await post('/api/caseInfo/queryPageList.do', restParams);
        if (res.data) {
          res.current = res.data.pageNum;
          res.pageSize = res.data.pageSize;
          res.totalCount = res.data.total;
          res.total = res.data.total;
          if (res.data && res.data.list) {
            res.data = res.data.list;
          }
        }

        return res;
      },
      getDetail: (params) => {
        let { id, restParams } = params || {};
        return get(`/api/caseInfo/get/${params.id}.do`, restParams);
      },
      $getDetail: (params) => {
        let { id, restParams } = params || {};
        return get(`/api/caseInfo/get/${params.id}.do`, restParams);
      },
      update: (params) => {
        return post('/api/caseInfo/updateCase.do', params);
      },
      batchUpdate: postFn('/api/caseInfo/batchUpdate.do'),
      create: postFn('/api/caseInfo/saveCase.do'),
      remove: postFn('/api/caseInfo/delete.do'),
      batchRemove: postFn('/api/caseInfo/batchDelete.do'),

      $getSpaceType: '/api/caseInfo/getSpaceType.do',
      $getAllShop: '/api/caseInfo/getAllShop.do',

      addCustomSpace: postFn('/api/dic/save.do')
    });
  }
}

export default new CaseManageService();
