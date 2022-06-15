# Advanced: Handling Side Effects, Using Reducers & Using the Context API

## Handling Side Effects with the useEffect() Hook

1. useEffect(()=>{}, [dependencies])
a function that should be executed after every component evaluation if the specific dependencies changed
Your side effect code goes into the function 
* dependencies of this effect the fucntion only runs if the dependencies changed
Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects. Whether or not you’re used to calling these operations “side effects” (or just “effects”), you’ve likely performed them in your components before.
If you’re familiar with React class lifecycle methods, you can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined.

<hr>

2. useReducer() hook 
sometimes you have more complex state for example if it got multiple states multiple ways of changing it or dependencies to other states
useState() then often become hard or error prone to use it's easy to write bad, inefficent or buggy code in such scenerio
useReducer() can be used as a replacement for useState() if you need for powerful state management 

* syntax:
const[state, dispatchFn] = useReducer(reducerFn, initalState, initialFn)
state --> the state snapshot used in the component re-render/re-evaluation cycle
dispatchFn --> a function that can be used to dispatch a new action (i.e. trigger an update of the state)
reducerFn --> (preState, action) => new state
A function that is dispatch automatically once a function is dispatched (via dispatchFn()) - it receives the latest state snapshot and should return the new updated state

<hr>
3. useContext hook:
In most cases, you will use props to pass data to components because props are your mechanism to configure components and to make them reusable.
Only if you have something which you would forward through a lot of components and you're forwarding it to a component that does something very specific.

* limitations of use cContext: 
React context is NOT optimized for high frequency changes better tool for that is React Redux
React Context also shouldn't be used to replace ALL component communications and props
component should still be configurable via props and short props chains might not need any replacement 

<hr>
4. useImperativeHandle() Hook:
In React, data is passed from parent to child components via props, known as unidirectional data flow. The parent component cannot directly call a function defined in the child component or reach down to grab a value for itself.
In certain circumstances, we want our parent component to reach down to the child component, getting data that originates in the child component for its own use. We can achieve this type of data flow with the useImperativeHandle Hook,
which allows us to expose a value, state, or function inside a child component to the parent component through ref
* Use cases:
When you need a bidirectional data and logic flow, but you don’t want to overcomplicate things by introducing state management libraries, the useImperativeHandle Hook is a great choice.
