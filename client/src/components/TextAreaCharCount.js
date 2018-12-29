import React from 'react';

import './components.min.css';

export default class TextAreaCharCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allowTypingPastLimit: false,
      charCount: 0,
      charLimit: 100,
      editable: false,
      text: '',
    }
  }

  isNewText = text => text !== this.state.text;

  isTextLTEtoLimit = length => length <= this.state.charLimit;

  isTextGTEtoLimit = length => length >= this.state.charLimit;

  handleChange = e => {
    e.preventDefault();
    const { value } = e.target;
    this.setState((prevState, props) => {
      const { allowTypingPastLimit, charLimit } = prevState;
      const newState  = allowTypingPastLimit
                      ? { charCount: value.length, text: value }
                      : this.isTextLTEtoLimit(value.length)
                        ? { charCount: value.length, text: value }
                        :  { charCount: value.length - 1 };
      props.liftText(value);
      return newState;
    });
  }

  componentDidUpdate() {
    this.setState((prevState, props) => {
      const { text } = props;
      if ( this.isNewText(text) ) {
        return { charCount: text.length, text };
      }
    })
  }

  componentDidMount() {
    this.setState((prevState, props) => {
      const { allowTypingPastLimit, charLimit, text } = props;
      return {
        allowTypingPastLimit: false || allowTypingPastLimit,
        charCount: text.length,
        charLimit,
      };
    });
  }

  render() {
    const { charCount, text } = this.state;
    const { divClass, pClass, textareaClass, charLimit, liftText, ...rest } = this.props;
    const turnRed = this.isTextGTEtoLimit(charCount) ? 'warning-red' : '';
    return (
      <div className={`TextAreaCharCount ${divClass}`}>
        <textarea
          className={textareaClass}
          rows='1'
          onChange={this.handleChange}
          value={text} {...rest}>
        </textarea>
        <p className={`char-count ${turnRed} ${pClass}`}>{charCount} / {charLimit}</p>
      </div>
    );
  }
}
