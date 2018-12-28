import React from 'react';

export default class TextAreaCharCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charCount: 0,
      charLimit: 100,
      editable: false,
      text: '',
    }
  }

  handleChange = e => {
    e.preventDefault();
    const { value } = e.target;
    value.length <= this.state.charLimit ? this.setState({ charCount: value.length, text: value })
                        : this.setState({ charCount: value.length - 1});
    this.props.liftText(value);
  }

  componentDidUpdate() {
    const { text } = this.props;
    if (text !== this.state.text) {
      this.setState({ charCount: text.length, text });
    }
  }

  componentDidMount() {
    const { charLimit, text } = this.props;
    this.setState({ text: text, charCount: text.length, charLimit })
  }

  render() {
    const { charCount, text } = this.state;
    const { divClass, pClass, textareaClass, charLimit, liftText, ...rest } = this.props;
    const turnRed = charCount === charLimit ? 'warning-red' : '';
    return (
      <div className={`${divClass} TextAreaCharCount`}>
        <textarea className={textareaClass} onChange={this.handleChange} value={text} {...rest}></textarea>
        <p className={`${turnRed} ${pClass} char-count`}>{charCount} / 150</p>
      </div>
    );
  }
}
