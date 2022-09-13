declare namespace API {
  /** 登录参数 */
  type LoginParams = {
    loginType: number;
    password: string;
    name: string;
  };

  /** 登录成功结果 */
  type LoginResult = {
    RID: string;
    RName: string;
    UID: string;
    UName: string;
    ok: string;
  };

  /** 获取验证码参数 */
  type CaptchaParams = {
    width?: number;
    height?: number;
  };

  /** 获取验证码结果 */
  type CaptchaResult = {
    img: string;
    id: string;
  };
}
