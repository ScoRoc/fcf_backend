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
      weekOf: '',
      wods: [],
    }
  }

  isEscapeKey = isEqual('Escape');
  isLTEtoCharLimit = () => isLessThanOrEqual(this.state.charLimit);

  // liftText = text => {
  //   this.setState((prevState, props) => {
  //     const { allowTypingPastLimit } = prevState;
  //     const newState  = allowTypingPastLimit
  //                     ? { charCount: text.length, text }
  //                     : this.isLTEtoCharLimit()(text.length)
  //                       ? { charCount: text.length, text }
  //                       : { charCount: text.length - 1 };
  //     return newState;
  //   });
  // }

  // clearText = () => {
  //   this.setState({ charCount: 0, text: '' });
  // }

  // cancelChange = () => {
  //   this.setState(prevState => {
  //     const { initialText } = prevState;
  //     return {
  //       charCount: initialText.length,
  //       date: '',
  //       editable: false,
  //       text: initialText,
  //     }
  //   });
  // }

  // handleKeyUp = e => {
  //   e.preventDefault();
  //   if ( this.isEscapeKey(e.key) ) this.cancelChange();
  // }

  // toggleEdit = () => {
  //   this.setState({ editable: !this.state.editable });
  // }

  // handleUpdateWod = ({ date, _id, text }) => {
  //   this.toggleEdit();
  //   this.props.updateWod({ date, _id, text });
  //   this.setState({ date, initialText: text, text });
  // }

  // getFormattedWeekOf = date => {
  //   console.log('date: ', date)
  //   const mDate = moment(date);
  //   const day = mDate.format('dddd');
  //   const month = mDate.format('MMMM');
  //   const dateOfMonth = mDate.format('Do');
  //   return `${day}, ${month} ${dateOfMonth}`;
  // }

  // componentDidUpdate(prevProps) {
  //   this.setState((prevState, props) => {
  //     if (prevState.date !== props.selectedDate && props.selectedDate._isValid) {
  //       return { date: props.selectedDate }
  //     }
  //   });
  // }

  componentDidMount() {
    // this.setState((prevState, props) => {
    //   console.log('wodweek: ', this.props.wodweek);
    //   const { weekOf, wods } = props.wodweek;
    //   return { weekOf, wods }
    // });
  }

  render() {
      /////////////////////////
     // HANDLE CAPPING TEXT //
    /////////////////////////
    // const { weekOf } = this.state;
    // const formattedWeekOf = this.getFormattedWeekOf(weekOf);
    // const disabled  = this.isLTEtoCharLimit()(text.length)
    //                 ? ''
    //                 : 'disabled';
    // const clearBtn = editable
    //                 ? <button onClick={this.clearText}>Clear</button>
    //                 : '';
    // const cancelBtn = editable
    //                 ? <button onClick={this.cancelChange}>Cancel</button>
    //                 : '';
    // const doneEditBtn = {
    //   firstState: {
    //     btnClass: 'edit-btn',
    //     btnOnClick: this.toggleEdit,
    //     btnText: 'Edit',
    //   },
    //   secondState: {
    //     btnClass: 'done-btn',
    //     // btnOnClick: doneOnClick,
    //     btnOnClick: () => this.handleUpdateWod({ date: date._d, _id: this.props.wod._id, text }),
    //     btnText: 'Done',
    //   },
    // }
    return (
      <div>
        <p>hello from wodstripday</p>
        {/* <TwoStateTextTACC
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
        /> */}
        {/* <TwoStateButton
          disabled={disabled}
          firstState={doneEditBtn.firstState}
          secondState={doneEditBtn.secondState}
          useFirstState={!editable}
        /> */}
        {/* {clearBtn} */}
        {/* {cancelBtn} */}
      </div>
    );
  }
}
