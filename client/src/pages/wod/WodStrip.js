import React from 'react';

import TwoStateButton from '../../components/TwoStateButton';
import TwoStateTextTACC from '../../components/TwoStateTextTACC';

import { isEqual, isLessThanOrEqual } from '../../utils/comparisons';

export default class WodStrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allowTypingPastLimit: true,
      charCount: 0,
      charLimit: 75,
      editable: false,
      text: '',

      initialText: '',
    }
  }

  isEscapeKey = isEqual('Escape');
  isLTEtoCharLimit = () => isLessThanOrEqual(this.state.charLimit);

  liftText = text => {
    this.setState((prevState, props) => {
      const { allowTypingPastLimit } = prevState;
      const newState  = allowTypingPastLimit
                      ? { charCount: text.length, text }
                      : this.isLTEtoCharLimit()(text.length)
                        ? { charCount: text.length, text }
                        : { charCount: text.length - 1 };
      return newState;
    });
  }

  clearText = () => {
    this.setState({ charCount: 0, text: '' });
  }

  cancelChange = () => {
    this.setState(prevState => {
      const { initialText } = prevState;
      return {
        charCount: initialText.length,
        editable: false,
        text: initialText,
      }
    });
  }

  handleKeyUp = e => {
    e.preventDefault();
    if ( this.isEscapeKey(e.key) ) this.cancelChange();
  }

  toggleEdit = () => {
    this.setState({ editable: !this.state.editable });
  }

  render() {
    const { editable, text } = this.state;
    const disabled  = this.isLTEtoCharLimit()(text.length)
                    ? ''
                    : 'disabled';
    const clearBtn = editable
                    ? <button onClick={this.clearText}>Clear</button>
                    : '';
    const cancelBtn = editable
                    ? <button onClick={this.cancelChange}>Cancel</button>
                    : '';
    const doneEditBtn = {
      firstState: {
        btnClass: 'edit-btn',
        btnOnClick: this.toggleEdit,
        btnText: 'Edit',
      },
      secondState: {
        btnClass: 'done-btn',
        // btnOnClick: doneOnClick,
        btnOnClick: this.toggleEdit,
        btnText: 'Done',
      },
    }
    return (
      <>
        <h4>{this.props.day}</h4>
        <TwoStateTextTACC
          allowTypingPastLimit={true}
          charLimit={75}
          focusTextarea={false}
          handleKeyUp={this.handleKeyUp}
          liftText={this.liftText}
          pClass='WodStrip__text-wrap__p'
          taccDivClass='WodStrip__text-wrap__div'
          taccPClass='WodStrip__text-wrap__div__p'
          taccTextareaClass='WodStrip__text-wrap__div__textarea'
          text={text}
          useTACC={editable}
          wrapperClass='WodStrip__text-wrap'
        />
        <TwoStateButton
          disabled={disabled}
          firstState={doneEditBtn.firstState}
          secondState={doneEditBtn.secondState}
          useFirstState={!editable}
        />
        {clearBtn}
        {cancelBtn}
      </>
    );
  }
}
