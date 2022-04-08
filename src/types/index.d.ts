// * Define type in here
declare type $TODO = any
declare type FavoritesList = {
  id: string,
  name: string
}

declare type AnyObject = {
  [key: string]: any;
}

declare type ArrayOrNot<T> = T | Array<T>;

declare type GlassOnResult<T = any> = {
  status: GlassOnResponseStatus.Success
  message: string
  result: T
}
  