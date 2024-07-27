# Naming conventions

## General

Namespaces should be named in plural and using [kebab-case](https://en.wikipedia.org/wiki/Letter_case#Kebab_case)

⚠️ Component naming: Components should be named based on their functionality and grouped according to logical categories..

<br/>

## Files

All files should be named using [kebab-case](https://en.wikipedia.org/wiki/Letter_case#Kebab_case)

_Examples:_


❌ Bad practice

```
camelCaseName.service.ts
snake_case_name.service.ts
combinedName_Service.service.ts
```

✔️ Good practice

```
core-members-utilities.service.ts
```

<br/>

## Classes/Interfaces/Enums

Class names should be singular. NG conventions should be followed: **_class-name.TYPE.ts_**.

The _TYPE_ could refer to model, service, pipe, etc. meaning we should have naming like following:

_Examples:_

❌ Bad practice
```
  model-name.ts
  enum-name.ts
  constant-name.ts
```


✔️ Good practice
```
  model-name.model.ts
  enum-name.enum.ts
  constant-name.const.ts
```

**NOTE: Use Interfaces to define models. Avoid using class for this purpose.**

<br/>

## Services

Keep in mind that a service name should describe its purpose.

⚠️ Never mix general logic, http calls, and the other stuff into a single service!

If a service is responsible for general logic, it should be named with the `utility` suffix.

Services that handle `HTTP` requests should encapsulate methods related to `HTTP` and have the `http` suffix in their name.

_Examples_:

❌ Bad practice

```ts
export class AuthService() {
  public getTokenFromApi(): void { /* Call to API here */ }
  public getLastLoginTime(): Date { /* Handle some logic here that deals with local data */ }
}
```

✔️ Good practice

HTTP calls are in a `http` service (that extends `CoreHttpService`),

```ts
export class AuthHttpService() {
  public getTokenFromApi(): void { /* Call to API here */ }
}
```

while general logic is wrapped by a `utility` service.

```ts
export class AuthUtilityService() {
  public getLastLoginTime(): Date { /* Handle some logic here that deals with local data */ }
}
```

<br/>

## Variables/Properties/Methods

Use [camelCase](https://en.wikipedia.org/wiki/Letter_case#Camel_case) for naming those. Names should be descriptive.

_Examples_:

❌ Bad practice

```ts
let last_login-time = null;
```

✔️ Good practice

```ts
let lastLoginTime = null;
```

<br/>

## Observables/Subscriptions

Always use `$` suffix for naming Observables, Subscriptions and similar entities.

_Examples_:

❌ Bad practice

```ts
private users: Observable<User[]>;
```

✔️ Good practice

```ts
private users$: Observable<User[]>;
```

<br/>

## Methods

<br/>

### UI Responses

Use `on` prefix for all methods that handle UI responses. Those methods are being called from a template.

_Examples:_

❌ Bad practice

```html
<button (click)="save()">Save</button>
```

✔️ Good practice

```html
<button (click)="onSave()">Save</button>
```

and in our `.ts` file, this method should be defined like following:

```ts
public onSave(): void {
  // some code here...
}
```

<br/>

### Subscription callback methods (Handlers)


Methods of this type should be used when subscribing to an event or method with more than two or three lines of code in the callback section.

In such cases, introduce a new method to handle all the logic from the callback.

The new method should be named with prefix `handle`.

_Examples:_

❌ Bad practice

```ts
private getUsers(): void {
  this.usersHttpService.getUsers()
    .subscribe(users => {
      /* Handling data here */
    })
}
```

✔️ Good practice

```ts
private getUsers(): void {
  this.usersHttpService.getUsers()
    .subscribe(this.handleUsers);
}


private handleUsers = (users: User[]) => {
  /* Do some magic here */
}
```

<br/>

## SCSS conventions

The recommended SCSS convention could be found [here](https://getbem.com/).

Before you continue, check if it is applicable to your portion of code.
