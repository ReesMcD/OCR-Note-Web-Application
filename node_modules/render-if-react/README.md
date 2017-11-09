# react-render-if
HOC to render component with condition

### Installation
```
npm install --save render-if-react
```

### Limitation
Class component must be render as child.

### Props
| Name | Description | Default |
| --- | --- | --- |
| `condition` | `Condition to render` | true |
| `component` | `Component to be render when condition is true` |  |
| `elseComponent` | `Component to be render when condition is false` |  |
| `strict` | `Mode to handle invalid component true: throw Error, false: log warning` | false |


### Example render as props
```jsx
import RenderIf from 'render-if-react'

const Hello = () => <h1>Hello</h1>

class MyComponent extends Component {
    render() {
        return (
            <div>
                <RenderIf condition={1 + 1 === 2} component={<Hello />} />
            </div>
        );
    }
}
```

### Example child component
```jsx
import RenderIf from 'render-if-react'

class Hello extends Component {
    render() {
        return (
            <h3>Hello</h3>
        );
    }
}

class MyComponent extends Component {
    render() {
        return (
            <div>
                <RenderIf condition={1 + 1 === 2}>
                    <Hello />
                </RenderIf>
            </div>
        );
    }
}
```

### Example else component
```jsx
import RenderIf from 'render-if-react'

class Hello extends Component {
    render() {
        return (
            <h3>Hello</h3>
        );
    }
}

const ElseComponent = () => <div>Else Component</div>

class MyComponent extends Component {
    render() {
        return (
            <div>
                <RenderIf condition={0} elseComponent={ElseComponent}>
                    <Hello />
                </RenderIf>
            </div>
        );
    }
}
```