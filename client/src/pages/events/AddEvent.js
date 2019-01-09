import React from 'react';
import axios from 'axios';

import TextAreaCharCount from '../../components/TextAreaCharCount';

import { isLessThanOrEqual } from '../../utils/comparisons';


export default class AddEvent extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.url = React.createRef();
  //   this.state = {
  //     allowTypingPastLimit: false,
  //     announcementText: '',
  //     charCount: 0,
  //     charLimit: 150,
  //     file: '',
  //     imgUrl: '',
  //   }
  // }
  //
  // isTextLTEtoLimit = () => isLessThanOrEqual(this.state.charLimit);
  //
  // handleErrors = data => {
  //   console.log('data: ', data);
  //   console.log('err: ', data._message)
  // }
  //
  // handleSuccess = data => {
  //   console.log('success: ', data);
  //   this.props.addAnnouncement(data.announcement);
  // }
  //
  // liftAnnouncementText = announcementText => {
  //   this.setState((prevState, props) => {
  //     const { allowTypingPastLimit } = prevState;
  //     const newState  = allowTypingPastLimit
  //                     ? { charCount: announcementText.length, announcementText: announcementText }
  //                     : this.isTextLTEtoLimit()(announcementText.length)
  //                       ? { charCount: announcementText.length, announcementText: announcementText }
  //                       : { charCount: announcementText.length - 1 };
  //     return newState;
  //   });
  // }
  //
  // // handleImgBtnClick = e => {
  // //   e.preventDefault()
  // // }
  //
  // handleImgChange = e => {
  //   const file = e.target.files[0]
  //   // console.log('file: ', file);
  //   this.setState({ file });
  //
  //   // const reader = new FileReader();
  //   // reader.onloadend = () => {
  //   //   // console.log('reader result: ', reader.result)
  //   //   this.setState({ imgUrl: reader.result });
  //   // }
  //   // reader.readAsDataURL(file);
  // }
  //
  // handleSubmit = e => {
  //   e.preventDefault();
  //   const { announcementText, file } = this.state;
  //   axios.post('/announcements', {
  //     announcementText,
  //     foo,
  //     url: this.url.current.value
  //   }).then(result => {
  //     const { data } = result;
  //     data.errors ? this.handleErrors(data) : this.handleSuccess(data);
  //     this.setState({ announcementText: '' });
  //   });
  // }
  //
  // componentDidMount() {
  //   this.setState((prevState, props) => {
  //     const { allowTypingPastLimit, charLimit } = props;
  //     return {
  //       allowTypingPastLimit: false || allowTypingPastLimit,
  //       charLimit: charLimit || 150,
  //     };
  //   });
  // }

  render() {
    // const { allowTypingPastLimit, announcementText, charLimit, imgUrl } = this.state;
    // const disabled = this.isTextLTEtoLimit()(announcementText.length) ? '' : 'disabled';
    return (
      <p>yo</p>
      // <section className='AddAnnouncement'>
      //   <form encType="multipart/form-data" className='AddAnnouncement__form' onSubmit={this.handleSubmit}>
      //     <div className='AddAnnouncement__form__announcement-wrap'>
      //       <label htmlFor='new-announcement-text'>Announcement</label>
      //         <TextAreaCharCount
      //           allowTypingPastLimit={allowTypingPastLimit}
      //           charLimit={charLimit}
      //           id='new-announcement-text'
      //           liftText={this.liftAnnouncementText}
      //           divClass='AddAnnouncement__form__tacc-wrap-div'
      //           pClass='AddAnnouncement__form__tacc-wrap-div__p'
      //           textareaClass='AddAnnouncement__form__tacc-wrap-div__textarea'
      //           required
      //           text={announcementText}
      //         />
      //       </div>
      //       <div className='AddAnnouncement__form__url-wrap'>
      //         <label htmlFor='new-announcement-url'>URL</label>
      //         <input
      //           id='new-announcement-url'
      //           ref={this.url}
      //           type='text'
      //         />
      //       </div>
      //       <div className='AddAnnouncement__form__img-wrap'>
      //         <label htmlFor='new-announcement-img'>Image</label>
      //         {/* <button onClick={this.handleImgBtnClick}>Choose an image</button> */}
      //         <input
      //           id='new-announcement-img'
      //           name='imgFile'
      //           onChange={this.handleImgChange}
      //           ref={this.img}
      //           type='file'
      //         />
      //         {/* <img src={imgUrl} /> */}
      //         {/* <div style={{ height: '30vh', background: 'green', }}> */}
      //           <ImgCrop src={imgUrl} />
      //         {/* </div> */}
      //       </div>
      //     <button className={disabled} disabled={disabled} type='submit'>Add Announcement</button>
      //   </form>
      // </section>
    );
  }
}
