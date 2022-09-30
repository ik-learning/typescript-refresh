# Work with Jest

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Contents

- [Trash to Remove](#trash-to-remove)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Trash to Remove

```js
all(options?: PaginatedRequestOptions): Promise<import("../infrastructure").GetResponse>;
activities(options?: Sudo): Promise<import("../infrastructure").GetResponse>;
projects(userId: UserId, options?: Sudo): Promise<import("../infrastructure").GetResponse>;
block(userId: UserId, options?: Sudo): Promise<object>;
create(options?: BaseRequestOptions): Promise<object>;
current(options?: Sudo): Promise<import("../infrastructure").GetResponse>;
edit(userId: UserId, options?: BaseRequestOptions): Promise<object>;
events(userId: UserId, options?: BaseRequestOptions & EventOptions): Promise<import("../infrastructure").GetResponse>;
search(emailOrUsername: string, options?: Sudo): Promise<import("../infrastructure").GetResponse>;
show(userId: UserId, options?: BaseRequestOptions): Promise<import("../infrastructure").GetResponse>;
remove(userId: UserId, options?: Sudo): Promise<object>;
unblock(userId: UserId, options?: Sudo): Promise<object>;
```

```js
export declare type PaginationResponse = {
    data: object[];
    pagination: PaginationOptions;
};
export declare type GetResponse = PaginationResponse | object | object[];
export declare type PostResponse = object;
export declare type PutResponse = object;
export declare type DelResponse = object;
```
