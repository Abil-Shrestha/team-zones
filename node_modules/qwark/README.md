# the simpliest way to make `useState` global
[Demo](https://codesandbox.io/s/qwark-demo-5ohe7g)

`qwark` creates a global `useState` hook. No Context. No Providers. With `useState`-like API

## Installation

```bash
npm install qwark
```

or yarn:

```bash
yarn add qwark
```

## Usage
### Create qwark hook
```javascript
import qwark from "qwark";

const useCountQwark = qwark(0); // call with initial state
```
### Use the created qwark hook in any React component
``` javascript
const Button = () => {
  const [count, setCount] = useCountQwark();

  return <button onClick={() => setCount(count + 1)}>Increment</button>;
};
```

``` javascript
const Count = () => {
  const [count] = useCountQwark();

  return <p>{count}</p>;
};
```
