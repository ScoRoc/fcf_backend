import React from 'react';

export default class TextAreaCharCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charCount: 0,
      editable: false,
      text: '',
    }
  }

  handleChange = e => {
    e.preventDefault();
    const { value } = e.target;
    value.length <= 150 ? this.setState({ charCount: value.length, text: value })
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
    const { text } = this.props;
    this.setState({ text: text, charCount: text.length })
  }

  render() {
    const { charCount, text } = this.state;
    const turnRed = charCount === 150 ? 'warning-red' : '';
    return (
      <div style={this.props.divStyle} className='TextAreaCharCount'>
        <textarea style={this.props.textareaStyle} onChange={this.handleChange} value={text} {...this.props}></textarea>
        <p style={this.props.pStyle} className={`${turnRed} char-count`}>{charCount} / 150</p>
      </div>
    );
  }
}
