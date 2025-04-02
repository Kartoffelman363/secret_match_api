export interface UserFromReq {
  username: string;
}

export function userFromReq(req: object): UserFromReq | null {
  if (
    'user' in req &&
    req.user !== null &&
    typeof req.user === 'object' &&
    'username' in req.user &&
    typeof req.user.username === 'string'
  ) {
    return { username: req.user.username };
  }
  return null;
}
