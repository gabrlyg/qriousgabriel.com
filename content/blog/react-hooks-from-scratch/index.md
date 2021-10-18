---
title: (Not) React Hooks from Scratch
date: '2021-10-17'
description: A very basic simulation of React Hooks with a single function component.
---

I've been wondering how [React Hooks](https://reactjs.org/docs/hooks-intro.html) work for quite a while.

This blog is not going to talk about the benefits of Hooks, but we are going to go through a very basic simulation of React Hooks so that we can have some understanding of how Hooks work under the hood.

## Replicating `useState`

`useState` Hook API is very simple, it takes an `initialState` and returns a tuple of the state and its setter:

```js
const [state, setState] = React.useState(initialState)
```

Now let's try and clone the logics of `useState`. You probably will come up with something like the following:

```js
const useState = (initialState) => {
  let state = initialState
  const setState = (newState) {
    state = newState
  }
  return [state, setState]
}
```

We could also create a function that simulates a component and a fake `render` function to test if the new Hook we implemented.

As you can see below, function `Component` simulates a `React.FunctionComponent`. But to make our example simpler, this fake `Component` doesn't actually render an element in the DOM, instead its internal `render` function simply `console.log`s its state, in this case `{ count }`.

The higher level `render` function then takes a `FunctionComponent` as argument. Since `FunctionComponent` is a function, let's call it and assign its result to a variable so we can call its internal `render` function and simulate user actions to it.

```js
const render = (FunctionComponent) => {
  let result = FunctionComponent()
  result.render()
  return result
}

const NotAComponent = () => {
  const [count, setCount] = useState(0)

  const click = () => {
    setCount(count + 1)
  }

  const render = () => {
    console.log(`render: ${{ count }}`)
  }

  return {
    click,
    render,
  }
}
```

Now we can run the above code and simulate some user actions to call `NotAComponent`'s internal function `click`, which would trigger an update to the `count` state. But since this is _not_ `React`, we need to manually re-render our `NotAComponent`.

```js
let app = render(NotAComponent)
app.click()
app = render(NotAComponent) // render: { count: 0 }
app.click()
app = render(NotAComponent) // render: { count: 0 }
```

If you have paid attention you will probably noticed that this will not work, the `console.log` will always be `render: { count: 0 }`. This is because we have run into the stale closure problem. Every time we run `render(NotAComponent)` it calls `NotAComponent`, which calls `useState`, which always sets `state` to `initialState` and we will never see the updated state. But we can fix this by moving the state into a higher level closure.

```js
let state

const useState = (initialState) => {
  state = state || initialState
  const setState = (newState) {
    state = newState
  }
  return [state, setState]
}

let app = render(NotAComponent)
app.click()
app = render(NotAComponent) // render: { count: 0 }
app.click()
app = render(NotAComponent) // render: { count: 1 }
```

But that's just one state, what if we want to manage multiple states?

## An `Array` of states

In actual `React` implementation, `Hooks` and their states are stored in a Linked List, but since our example is _**Not**_ `React`, and to make things simpler, we will be using an `Array` instead.

```js
const hooks = []
let currentHook = 0

const useState = (initialState) => {
  const index = currentHook
  let state = hooks[index] || initialState
  const setState = (newState) => {
    hooks[index] = newState
  }
  currentHook++
  return [state, setState]
}

const render = (FunctionComponent) => {
  let result = FunctionComponent()
  result.render()
  currentHook = 0
  return result
}
```

Note we have also reset `currentHook` to `0`, so that we are calling the hooks in the same order with every render.

You might have seen this from [Rule of Hooks](https://reactjs.org/docs/hooks-rules.html) before:

> Only Call Hooks at the Top Level. Don’t call Hooks inside loops, conditions, or nested functions.

Now you probably will have a better understanding why this rule is there in the first place as well. It doesn't matter if you are using an `Array` like our example or a Linked List like the real `React`, it's crucial that Hooks are always called in the same order every time a component renders. Otherwise `React` will get lost in its internal states and you definitely don't want that to happen.

## Replicating `useEffect`

Now we have replicated `useState`, let's try and replicate another `Hook` that we often use, `useEffect`.

```js
const useEffect = (callback, dependencies) => {
  const hasNoDeps = !dependencies
  const currentEffectDeps = hooks[currentHook]
  const hasChangedDependencies = currentEffectDeps
    ? dependencies.some((item, index) => {
        return !Object.is(item, currentEffectDeps[index])
      })
    : true
  if (hasNoDeps || hasChangedDeps) {
    callback()
    hooks[currentHook] = dependencies
  }
  currentHook++
}
```

Note how we are tracking the dependencies by adding the dependencies `Array` into the `hooks` `Array` where we track all states.

```js
const NotAComponent = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('effect:', { count })
  }, [count])

  const click = () => {
    setCount(count + 1)
  }

  const render = () => {
    console.log('render:', { count })
  }

  return {
    click,
    render,
  }
}

let app = render(NotAComponent)
app.click()
app = render(NotAComponent)
// effect: { count: 0 }
// render: { count: 0 }
app.click()
app = render(NotAComponent)
// effect: { count: 1 }
// render: { count: 1 }
```

## Replicating `useReducer`

You might have used `useReducer` when you have complex state logic. Under the hood it works similarly like our `useState` implementation. To make things easier, we are not replicating the lazy initialisation feature of the actual `React.useReducer` in our example.

```js
const useReducer = (reducer, initialState) => {
  const index = currentHook
  let state = hooks[index] || initialState
  const dispatch = (action) => {
    const newState = reducer(state, action)
    hooks[index] = newState
  }
  currentHook++
  return [state, dispatch]
}
```

Now let's modify our `NotAComponent` again to make use of our `useReducer` Hook.

```js
const NotAComponent = () => {
  const [count, setCount] = NotReact.useState(0)
  const initialAnotherCount = {
    count: 0,
  }
  const countReducer = (state, action) => {
    switch (action.type) {
      case 'increment':
        return {
          count: state.count + 1,
        }
      case 'decrement':
        return {
          count: state.count - 1,
        }
      default:
        throw new Error(`Count Reducer: Invalid action type: "${action.type}"`)
    }
  }
  const [anotherCount, dispatchAnotherCount] = NotReact.useReducer(
    countReducer,
    initialAnotherCount
  )

  NotReact.useEffect(() => {
    console.log('effect:', { count, anotherCount: anotherCount.count })
  }, [count, anotherCount])

  const click = () => {
    setCount(count + 1)
    dispatchAnotherCount({
      type: anotherCount.count > 0 ? 'decrement' : 'increment',
    })
  }

  const render = () => {
    console.log('render:', { count, anotherCount: anotherCount.count })
  }

  return {
    click,
    render,
  }

  let app = render(NotAComponent)
  app.click()
  app = render(NotAComponent)
  // effect: { count: 0, anotherCount: 0 }
  // render: { count: 0, anotherCount: 0 }
  app.click()
  app = render(NotAComponent)
  // effect: { count: 1, anotherCount: 1 }
  // render: { count: 1, anotherCount: 1 }
  app.click()
  app = render(NotAComponent)
  // effect: { count: 2, anotherCount: 0 }
  // render: { count: 2, anotherCount: 0 }
}
```

## `useState` is in fact `useReducer`

You probably have noticed how similar this is to our `useState` implementation above? It's so similar we might as well modify our `useState` hook to call `useReducer` instead. In fact this is how `useState` works in actual `React`. We can also get _functional update_ of states from this refactor.

```js
const basicStateReducer = (state, action) => {
  return typeof action === 'function' ? action(state) : action
}
const useState = (initialState) => {
  return useReducer(basicStateReducer, initialState)
}
```

Then we can just call `useState` as we did before, no change is needed.

## Conclusion

Hopefully this blogs give you an idea of how React Hooks work and a better understanding of the Rules of Hooks.

Have fun coding!

_A live example with `NotReact` written in TypeScript of this blog can also be found on [CodeSandBox](https://codesandbox.io/s/not-react-9nqqz?file=/src/index.js)_

---

_If you have noticed anything incorrect/inaccurate, please reach out to me. You can find me on Twitter as [@qriousgabriel](https://www.twitter.com/qriousgabriel) or on [GitHub](https://www.github.com/qriousgabriel)_
