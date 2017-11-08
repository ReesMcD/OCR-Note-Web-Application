'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Editable = function (_React$Component) {
  _inherits(Editable, _React$Component);

  function Editable(props) {
    _classCallCheck(this, Editable);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Editable).call(this, props));

    _this.state = {
      lable: "",
      editable: false,
      value: _this.props.value,
      saving: false
    };

    _this.firstValue;
    _this.keyDownCode;
    return _this;
  }

  _createClass(Editable, [{
    key: 'onClickEdit',
    value: function onClickEdit(e) {
      if (!this.state.saving) {
        this.setState({
          editable: true,
          saving: false
        });
        this.firstValue = this.state.value;
        this.refs.element.focus();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value && this.props.value != nextProps.value) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: 'onClickCancel',
    value: function onClickCancel() {
      if (!this.state.saving) {
        this.setState({
          editable: false,
          value: this.firstValue
        });
      }
    }
  }, {
    key: 'onChangeValue',
    value: function onChangeValue(e) {
      this.setState({ value: e.target.value });
    }
  }, {
    key: 'onClickSave',
    value: function onClickSave(e) {
      if (this.firstValue == this.state.value) {
        this.setState({
          editable: false,
          saving: false
        });
      } else {
        this.setState({ saving: true });
        this.props.onSave(this.state.value, this);
      }

      e.target.blur();
    }
  }, {
    key: 'success',
    value: function success(value) {
      var state = {
        editable: false,
        saving: false
      };

      if (value !== undefined) {
        state.value = value;
      }
      this.setState(state);
    }
  }, {
    key: 'fail',
    value: function fail() {
      this.setState({
        editable: true,
        saving: false
      });
    }
  }, {
    key: 'getInnerHtml',
    value: function getInnerHtml(target, key) {
      return { __html: target[key] };
    }
  }, {
    key: 'onKeyPress',
    value: function onKeyPress(e) {
      if (this.props.needsSaveOnKeyPress(e)) {
        e.preventDefault();
        this.onClickSave(e);
        return false;
      }
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      //日本語IMEの入力対策
      this.keyDownCode = e.keyCode;
    }
  }, {
    key: 'onKeyUp',
    value: function onKeyUp(e) {
      if (this.keyDownCode == e.keyCode && e.keyCode == 27) {
        //ESCキー
        this.onClickCancel();
      }
    }
  }]);

  return Editable;
}(_react2.default.Component);

exports.default = Editable;


Editable.propTypes = {
  label: _react2.default.PropTypes.string,
  cancelLabel: _react2.default.PropTypes.string,
  saveLabel: _react2.default.PropTypes.string,
  editLabel: _react2.default.PropTypes.string,
  value: _react2.default.PropTypes.string,
  saveBtnClass: _react2.default.PropTypes.string,
  cancelBtnClass: _react2.default.PropTypes.string,
  editBtnClass: _react2.default.PropTypes.string,
  onSave: _react2.default.PropTypes.func.isRequired,
  needsSaveOnKeyPress: _react2.default.PropTypes.func
};

Editable.defaultProps = {
  label: '',
  cancelLabel: 'Cancel',
  saveLabel: 'Save',
  editLabel: 'Edit',
  saveBtnClass: 'btn btn-warning',
  cancelBtnClass: 'btn btn-default',
  editBtnClass: 'btn btn-primary',
  needsSaveOnKeyPress: function needsSaveOnKeyPress() {
    return false;
  }
};