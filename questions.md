### 1. What is the difference between Component and PureComponent? give an example where it might break my app.
Pure components do re-render only when state or props are changed. This can help to save resources
when we want to don't trigger re-render on parent re-rendering, but can cause problems when using
not primitive, but complex data types as props. They contain ref, so adding value in them won't 
cause re-render.

### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
Don't have experience of using Context in real projects :(
Only know when it should be used, but never dived deeper

### 3. Describe 3 ways to pass information from a component to its PARENT.
- Context API
- Redux
- Callbacks passing

### 4. Give 2 ways to prevent components from re-rendering.
Memoization (useMemo, useCallback) , keys using for lists

### 5. What is a fragment and why do we need it? Give an example where it might break my app.
It's wrap that represents nothing. We can use it to wrap multiple tags, without affecting DOM.
I don't know any issues that can be caused by fragment.

### 6. Give 3 examples of the HOC pattern.
- I remember Theme Provider HOC
- withStyles from MUI
- Router

### 7. what's the difference in handling exceptions in promises, callbacks and async...await.
Promises - catch(), callback and async/await with try and catch
but async functions returns Promise, so you can handle exception with catch in case if you're
not planning to use await

### 8. How many arguments does setState take and why is it async.
It takes 2 args: object or callback and function, which runs after setState.

### 9. List the steps needed to migrate a Class to Function Component.
- Create function with the same name as class
- Replace render with return
- Replace state with hook useState
- Recreate used lifecycle methods with hooks
- Remove "this" usage

### 10. List a few ways styles can be used with components.
- Direct adding css/scss files to component file and applying styles 
by tagnames, classNames, etc.
- Direct styles in jsx
- Libraries ways (depends on what library is used)

### 11. How to render an HTML string coming from the server.
dangerouslySetInnerHTML, libs for parsing