# react-editable-text

Editable text line or box component for [facebook react](https://facebook.github.io/react/).`Box` use `textarea` element, `Line` use `input[type=text]` element.

I recommend using with [Bootstrap](http://getbootstrap.com/).

## Install

```
npm install react-editable-text --save-dev
```

## How to use

```es6
import React from 'react';
import Box from 'react-editable-text/Box';
import Line from 'react-editable-text/Line';

export default class GuestEditView extends React.Component
{
  constructor(props) {
    super(props);
  }

  onSaveMemo(memo, textarea){
    setTimeout(() => {
      console.log(memo);
      textarea.fix();
    }, 600);
  }

  render() {
    return (
      <div>
        <Line
          label='<i class="fa fa-user"></i>'
          onSave={(value, editable) => this.onSave(value, editable)}
          editLabel='<i class="fa fa-pencil"></i>'
          saveLabel='<i class="fa fa-floppy-o"></i>'
          cancelLabel='<i class="fa fa-ban"></i>'
          value='Initial line value'
          needsSaveOnKeyPress = {(e) => this.needsSaveOnKeyPressInInputText(e)}
        />
        <Box
          label='<i class="fa fa-list-alt"></i>&nbsp;Memo'
          onSave={(value, editable) => this.onSave(value, editable)}
          editLabel='<i class="fa fa-pencil"></i>'
          saveLabel='<i class="fa fa-floppy-o"></i>'
          cancelLabel='<i class="fa fa-ban"></i>'
          value='Initial box value'
          needsSaveOnKeyPress = {(e) => this.needsSaveOnKeyPressInTextarea(e)}
        />
      </div>
    );
  }
}

```

`onSave` sample is here. Second arg `editable` is this component.

```js
  onSave(value, editable){
    $.ajax({
      url: '/ajax/save',
      data:{value: value}
    }).done(() => {
      // change to fix mode
      editable.success();
    }).fail(() => {
      // back to edit mode
      editable.fail();
    });
  }
```

If you want save when some key press in the element, Set callback to `needsSaveOnKeyPress` props, and return `true`.The arg is keypress event.

```js
  needsSaveOnKeyPressInInputText(e){
    if(e.charCode == 13){
      return true;
    }

    return false;
  }

  needsSaveOnKeyPressInTextarea(e){
    if(e.charCode == 13 && e.shiftKey){
      return true;
    }

    return false;
  }
```

All labels are set to [dangerouslySetInnerHTML](https://facebook.github.io/react/tips/dangerously-set-inner-html.html).Please note the "cross-site scripting".

All props list is [here](src/Editable.es6#L57-L67)
