import React from 'react';

import './TextAreaCharCount.min.css';

import { isLessThanOrEqual } from '../utils/comparisons';


export default class TextAreaCharCount extends React.Component {
  constructor(props) {
    super(props);
    this.textarea = React.createRef();
    this.state = {
      allowTypingPastLimit: false,
      charCount: 0,
      charLimit: 100,
      editable: false,
      text: '',
    }
  }

  isTextLTEtoLimit = () => isLessThanOrEqual(this.state.charLimit);

  focusTextarea = () => {
    this.textarea.current.focus();
  }

  handleKeyUp = e => {
    e.preventDefault();
    if (this.props.handleKeyUp) this.props.handleKeyUp(e);
  }

  handleChange = e => {
    e.preventDefault();
    const { value } = e.target;
    this.setState((prevState, props) => {
      const { allowTypingPastLimit } = prevState;
      const newState  = allowTypingPastLimit
                      ? { charCount: value.length, text: value }
                      : this.isTextLTEtoLimit()(value.length)
                        ? { charCount: value.length, text: value }
                        :  { charCount: value.length - 1 };
      props.liftText(value);
      return newState;
    });
  }

  componentDidMount() {
    this.setState((prevState, props) => {
      if (props.focusTextarea) this.focusTextarea();
      const { allowTypingPastLimit, charLimit, text } = props;
      const pastLimit = allowTypingPastLimit === undefined ? false : allowTypingPastLimit;
      return {
        allowTypingPastLimit: pastLimit,
        charCount: text.length,
        charLimit,
        text,
      };
    });
  }

  render() {
    const { charCount, text } = this.state;
    const {
      allowTypingPastLimit,
      charLimit,
      divClass,
      focusTextarea,
      handleKeyUp,
      liftText,
      pClass,
      textareaClass,
      ...rest
    } = this.props;
    const turnRed = this.isTextLTEtoLimit()(charCount) ? '' : 'warning-red';
    return (
      <div className={`TextAreaCharCount ${divClass}`}>
        <textarea
          className={textareaClass}
          rows='1'
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          ref={this.textarea}
          value={text}
          {...rest}
          >
        </textarea>
        <p className={`char-count ${turnRed} ${pClass}`}>{charCount} / {charLimit}</p>
      </div>
    );
  }
}
