import React from 'react';
import Editable from './Editable'

export default class EditableBox extends Editable {
  render() {
    return (
      <div className="react-editable-text box">
        <div className="header clearfix">
          <label className="pull-left" dangerouslySetInnerHTML={this.getInnerHtml(this.props, 'label')}></label>
          <div className="buttons pull-right">
            {(() => {
              if(this.state.editable){
                return (
                  <div>
                    <button className={this.props.cancelBtnClass} onClick={(e) => {this.onClickCancel(e)}} dangerouslySetInnerHTML={this.getInnerHtml(this.props, 'cancelLabel')}></button>
                    &nbsp;
                    <button className={this.props.saveBtnClass} onClick={(e) => {this.onClickSave(e)}} dangerouslySetInnerHTML={this.getInnerHtml(this.props, 'saveLabel')}></button>
                  </div>
                )
              } else {
                return (<button className={this.props.editBtnClass} onClick={(e) => {this.onClickEdit(e)}} dangerouslySetInnerHTML={this.getInnerHtml(this.props, 'editLabel')}></button>)
              }
            })()}
          </div>
        </div>
        <div className="body">
          <textarea onClick={(e) => this.onClickEdit(e)} onKeyDown={(e) => this.onKeyDown(e)} onKeyUp={(e) => this.onKeyUp(e)} onKeyPress={(e) => this.onKeyPress(e)} ref="element" className="form-control" disabled={this.state.saving ? "disabled" : null} readOnly={this.state.editable ? null : "readOnly"} value={this.state.value} onChange={(e)=>{this.onChangeValue(e)}} />
        </div>
      </div>
    );
  }
}

var defaultProps = {};
for(var key in Editable.defaultProps){
  defaultProps[key] = Editable.defaultProps[key];
}

defaultProps.saveBtnClass += ' btn-xs';
defaultProps.cancelBtnClass += ' btn-xs';
defaultProps.editBtnClass += ' btn-xs';

EditableBox.defaultProps = defaultProps;