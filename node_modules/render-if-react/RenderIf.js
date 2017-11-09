import React, { Component } from 'react';
import PropTypes from 'prop-types'

const propTypes = {
    component: PropTypes.func,
    elseComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func
    ]),
    condition: PropTypes.any,
    strict: PropTypes.bool
}

const defaultProps = {
    condition: true,
    strict: false
}

class RenderIf extends React.Component {
    constructor(props) {
        super(props);

        this.wrapComponent = this.wrapComponent.bind(this)
        this.renderComponent = this.renderComponent.bind(this);
    }

    wrapComponent(component) {
        if (component.prototype && !component.prototype.render) {
            return () => component
        }
    }

    renderComponent(elseComponent) {
        if (!elseComponent) {
            return null;
        } else if (typeof elseComponent.type === 'function') {
            return elseComponent;
        } else if (typeof elseComponent === 'function') {
            return elseComponent();
        } else {
            return null;
        }
    }

    render() {
        const { component, children, condition, elseComponent } = this.props;

        if (!condition) return this.renderComponent(elseComponent);

        if (!!children) return children;

        if (component) return this.renderComponent(component);

        return this.renderComponent(elseComponent);
    }
}

RenderIf.propTypes = propTypes;
RenderIf.defaultProps = defaultProps;

export default RenderIf;