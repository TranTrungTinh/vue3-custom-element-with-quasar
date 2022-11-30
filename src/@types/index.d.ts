// * Define type in here
declare type $TODO = any

declare type AnyObject = {
  [key: string]: any
}

declare type CommonObject = {
  key: string
  value: string
}

declare type ArrayOrNot<T> = T | Array<T>
