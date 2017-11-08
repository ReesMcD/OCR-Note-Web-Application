import React from 'react';


export default class Editable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lable: "",
      editable: false,
      value: this.props.value,
      saving: false
    };

    this.firstValue;
    this.keyDownCode;
  }

  onClickEdit(e){
    if(!this.state.saving){
      this.setState({
        editable: true,
        saving: false
      });
      this.firstValue = this.state.value;
      this.refs.element.focus();      
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.value && this.props.value != nextProps.value){
      this.setState({
        value: nextProps.value
      });
    }
  }

  onClickCancel(){
    if(!this.state.saving){
      this.setState({
        editable: false,
        value: this.firstValue
      });      
    }
  }

  onChangeValue(e){
    this.setState({value: e.target.value});
  }

  onClickSave(e){
    if(this.firstValue == this.state.value){
      this.setState({
        editable: false,
        saving: false
      });
    } else {
      this.setState({saving: true});
      this.props.onSave(this.state.value, this);      
    }

    e.target.blur();
  }

  success(value){
    var state = {
      editable: false,
      saving: false
    };

    if(value !== undefined){
      state.value = value;
    }
    this.setState(state);
  }

  fail(){
    this.setState({
      editable: true,
      saving: false
    }); 
  }

  getInnerHtml(target, key){
    return {__html: target[key]}
  }

  onKeyPress(e){
    if(this.props.needsSaveOnKeyPress(e)){
      e.preventDefault();
      this.onClickSave(e);
      return false;
    }
  }

  onKeyDown(e){
    //日本語IMEの入力対策
    this.keyDownCode = e.keyCode;
  }

  onKeyUp(e){
    if(this.keyDownCode == e.keyCode && e.keyCode == 27){//ESCキー
      this.onClickCancel();
    }
  }
}

Editable.propTypes = {
  label: React.PropTypes.string,
  cancelLabel: React.PropTypes.string,
  saveLabel: React.PropTypes.string,
  editLabel: React.PropTypes.string,
  value: React.PropTypes.string,
  saveBtnClass: React.PropTypes.string,
  cancelBtnClass: React.PropTypes.string,
  editBtnClass: React.PropTypes.string,
  onSave: React.PropTypes.func.isRequired,
  needsSaveOnKeyPress: React.PropTypes.func
}

Editable.defaultProps = {
  label: '',
  cancelLabel: 'Cancel',
  saveLabel: 'Save',
  editLabel: 'Edit',
  saveBtnClass: 'btn btn-warning',
  cancelBtnClass: 'btn btn-default',
  editBtnClass: 'btn btn-primary',
  needsSaveOnKeyPress: () => false
};