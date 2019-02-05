import React from 'react';
import moment from 'moment';
import axios from 'axios';

import TwoStateButton from '../../components/TwoStateButton';
import TwoStateTextTACC from '../../components/TwoStateTextTACC';

import { isEqual, isLessThanOrEqual } from '../../utils/comparisons';

export default class WodStripDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charLimit: 50,
      date: '',
      editable: false,
      text: '',

      initialText: '',
    }
  }

  isEscapeKey = isEqual('Escape');
  isLTEtoCharLimit = () => isLessThanOrEqual(this.state.charLimit);

  toggleEdit = () => {
    this.setState({ editable: !this.state.editable });
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

  getFormattedDate = date => {
    const mDate = moment(date);
    const day = mDate.format('dddd');
    const mm = mDate.format('MM');
    const dd = mDate.format('DD');
    return `${day} ${mm}/${dd}`;
  }

  handleUpdateWod = ({ _id, text }) => {
    this.toggleEdit();
    this.setState({ initialText: text, text });
    this.props.updateWod({ _id, text });
  }

  // componentDidUpdate(prevProps) {
  //   this.setState((prevState, props) => {
  //     if (prevState.date !== props.selectedDate && props.selectedDate._isValid) {
  //       return { date: props.selectedDate }
  //     }
  //   });
  // }

  componentDidMount() {
    this.setState((prevState, props) => {
      const { date, text } = props.wod;
      const mDate = moment(date);
      return { charLimit: props.charLimit, date: mDate, initialText: text, text }
    });
  }

  render() {
      /////////////////////////
     // HANDLE CAPPING TEXT //
    /////////////////////////
    const { date, editable, text } = this.state;
    const { allowTypingPastLimit, charLimit } = this.props;
    const formattedDate = this.getFormattedDate(date);
    const disabled = this.isLTEtoCharLimit()(text.length) ? '' : 'disabled';
    const cancelBtn = editable ? <button onClick={this.cancelChange}>Cancel</button> : '';
    const doneEditBtn = {
      firstState: {
        btnClass: 'edit-btn',
        btnOnClick: this.toggleEdit,
        btnText: 'Edit',
      },
      secondState: {
        btnClass: 'done-btn',
        btnOnClick: () => this.handleUpdateWod({ _id: this.props.wod._id, text }),
        btnText: 'Done',
      },
    }
    return (
      <div>
        <label>{formattedDate}</label>
        <TwoStateTextTACC
          allowTypingPastLimit={allowTypingPastLimit}
          charLimit={charLimit}
          focusTextarea={false}
          handleKeyUp={this.handleKeyUp}
          liftText={this.liftText}
          pClass='WodStripDay__text-wrap__p'
          taccDivClass='WodStripDay__text-wrap__div'
          taccPClass='WodStripDay__text-wrap__div__p'
          taccTextareaClass='WodStripDay__text-wrap__div__textarea'
          text={text}
          useTACC={editable}
          wrapperClass='WodStripDay__text-wrap'
        />
        <TwoStateButton
          disabled={disabled}
          firstState={doneEditBtn.firstState}
          secondState={doneEditBtn.secondState}
          useFirstState={!editable}
        />
        {cancelBtn}
      </div>
    );
  }
}
