declare namespace API {
  type Menu = {
    createTime: Date;
    updateTime: Date;
    id: number;
    parentId: number;
    name: string;
    router: string;
    perms: string;
    /** 当前菜单类型 0: 目录 | 1: 菜单 | 2: 权限 */
    type: 0 | 1 | 2;
    icon: string;
    orderNum: number;
    viewPath: string;
    keepalive: boolean;
    isShow: boolean;
  };

  type PermMenu = {
    menus: Menu[];
    perms: string[];
  };

  type AdminUserInfo = {
    RID: string;
    RName: string;
    UID: string;
    UName: string;
    ok: string;
  };
}
