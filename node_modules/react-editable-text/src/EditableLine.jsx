import React from 'react';
import Editable from './Editable'

export default class EditableLine extends Editable {
  render() {
    return (
      <div className="input-group react-editable-text line">
        {(() => {
          if(this.state.editable){
            return (
              <span className="input-group-btn">
                <button className={this.props.cancelBtnClass} type="button" onClick={(e) => {this.onClickCancel(e)}} dangerouslySetInnerHTML={this.getInnerHtml(this.props, 'cancelLabel')}></button>
              </span>
            );
          } else if(this.props.label){
            return (
              <span className="input-group-addon" dangerouslySetInnerHTML={this.getInnerHtml(this.props, 'label')}></span>
            );
          }
        })()}
        <input onClick={(e) => this.onClickEdit(e)} onKeyDown={(e) => this.onKeyDown(e)} onKeyUp={(e) => this.onKeyUp(e)} onKeyPress={(e) => this.onKeyPress(e)} type="text" ref="element" className="form-control" disabled={this.state.saving ? "disabled" : null} readOnly={this.state.editable ? null : "readOnly"} value={this.state.value} onChange={(e)=>{this.onChangeValue(e)}} />
        <span className="input-group-btn">
        {(() => {
          if(this.state.editable){
            return (
              <button className={this.props.saveBtnClass} type="button" onClick={(e) => {this.onClickSave(e)}} dangerouslySetInnerHTML={this.getInnerHtml(this.props, 'saveLabel')}></button>
            )
          } else {
            return (
              <button className={this.props.editBtnClass} type="button" onClick={(e) => {this.onClickEdit(e)}} dangerouslySetInnerHTML={this.getInnerHtml(this.props, 'editLabel')}></button>
            )
          }
        })()}
        </span>
      </div>
    );
  }
}