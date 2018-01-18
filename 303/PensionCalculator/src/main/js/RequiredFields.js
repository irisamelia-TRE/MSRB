import React from 'react';

class RequiredFields extends React.Component {
  //Expects one property: hasSubmittedForm (boolean) indicates whether or not to highligh incomplete fields.
  // Optional parameter: defaultElements (array) specifies which values are defaults and should be considered incomplete
  constructor(props) {
    super(props);
    this.childrenToInitialClassName = {};
    this.isValueComplete = this.isValueComplete.bind(this)
  }

  isValueComplete(childValue) {
    let isDefaultValue = false;
    if (this.props.defaultElements !== undefined) {
      isDefaultValue = this.props.defaultElements.indexOf(childValue) !== -1;
    }
    return childValue !== undefined && childValue !== null && !Number.isNaN(childValue) && !isDefaultValue;
  }

  render() {
    const sourceChildren = this.props.children;
    let childrenToRender = sourceChildren;

    if (this.props.hasSubmittedForm) {
      const errorClass = 'has-error';
      childrenToRender = React.Children.map(this.props.children, (child) => {
        if (child) {
          const prevClassName = child.props.className;
          if (!this.isValueComplete(child.props.value)) {
            let newClassName = null;
            if (prevClassName === undefined) {
              newClassName = errorClass;
            } else {
              newClassName = `${prevClassName} ${errorClass}`;
            }
            return React.cloneElement(
              child,
              { className: newClassName },
            );
          } else if (prevClassName !== undefined) {
            const indexOfErrorClass = prevClassName.indexOf(errorClass);
            if (indexOfErrorClass >= 0) {
              const firstStringPart = prevClassName.substring(0, indexOfErrorClass);
              const secondStringPart = prevClassName.substring(indexOfErrorClass + errorClass.length + 1);
              const newClassName = `${firstStringPart} ${secondStringPart}`;
              return React.cloneElement(
                child,
                { className: newClassName },
              );
            } else {
              return child;
            }
          }
        }
        return child;
      });
    }

    return (
      <div>
        {childrenToRender}
      </div>
    );
  }
}

export default RequiredFields;
