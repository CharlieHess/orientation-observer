import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';

export class OrientationObserver extends Component {
  constructor(props) {
    super(props);
    this.setOrientation = this.setOrientation.bind(this);

    this.state = {
      orientation: null
    };
  }

  setOrientation() {
    if (window.innerHeight > window.innerWidth) {
      this.setState({ orientation: 'portrait' });
    } else {
      this.setState({ orientation: 'landscape' });
    }
  }

  componentDidMount() {
    this.setOrientation();
    window.addEventListener('resize', this.setOrientation);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.setOrientation);
  }

  render () {
    const { children, className } = this.props;
    const { orientation } = this.state;

    return (
      <div className={`${className}`}>
        {
          Children.map(children, (child) => {
            const { props } = child
            if (props.alwaysRender || props.orientation === orientation) {
              return child
            }
          })
        }
      </div>
    );
  }
}

const isOrientation = (props, propName, componentName, location, propFullName) => {
  const propValue = props[propName];
  if (propValue.type !== Orientation) {
    return new Error(`Invalid ${location} '${propFullName}' supplied to '${componentName}', expected 'Orientation' component.`);
  }
}

OrientationObserver.propTypes = {
  children: PropTypes.oneOfType([
    isOrientation,
    PropTypes.arrayOf(isOrientation)
  ]).isRequired,
  className: PropTypes.string
};

OrientationObserver.defaultProps = {
  className: ''
};

export class Orientation extends Component {
  render () {
    const { orientation, children, className } = this.props;
    return (
      <div className={`${className} react-orientation react-orientation--${orientation}`}>
        {children}
      </div>
    );
  }
}

Orientation.propTypes = {
  alwaysRender: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  orientation: PropTypes.oneOf([ 'portrait', 'landscape' ]).isRequired
};

Orientation.defaultProps = {
  className: '',
  alwaysRender: false
};
