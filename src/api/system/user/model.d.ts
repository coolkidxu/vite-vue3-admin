declare namespace API {
  type UserListPageResultItem = {
    createdAt: string;
    departmentId: number;
    email: string;
    headImg: string;
    id: number;
    name: string;
    nickName: string;
    phone: string;
    remark: string;
    status: number;
    updatedAt: string;
    username: string;
    departmentName: string;
    roleNames: string[];
    keyPath?: number[];
  };

  /** 获取用户列表结果 */
  type UserListPageResult = UserListPageResultItem[];

  /** 创建用户参数 */
  type CreateUserParams = {
    departmentId: number;
    name: string;
    username: string;
    roles: number[];
    nickName: string;
    email: string;
    phone: string;
    remark: string;
    status: number;
  };

  /** 管理员用户详情 */
  type AdminUserInfo = {
    RID: string;
    RName: string;
    UID: string;
    UName: string;
    ok: string;
  };

  /** 更新管理员用户参数 */
  type UpdateAdminInfoParams = {
    departmentId: number;
    name: string;
    username: string;
    roles: number[];
    nickName: string;
    email: string;
    phone: string;
    remark: string;
    status: number;
    id: number;
  };

  /** 更新管理员密码 */
  type UpdateAdminUserPassword = {
    userId: number;
    password: string;
  };
}
