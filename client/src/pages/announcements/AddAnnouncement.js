import React from 'react';
import axios from 'axios';

import ImgCrop from '../../components/ImgCrop';
import TextAreaCharCount from '../../components/TextAreaCharCount';

import { isLessThanOrEqual } from '../../utils/comparisons';
import useAxios from '../../utils/axios-helpers';

const path = '/announcements';
const { postWithAxios } = useAxios(path);


export default class AddAnnouncement extends React.Component {
  constructor(props) {
    super(props);
    this.img = React.createRef();
    this.state = {
      allowTypingPastLimit: false,
      announcementText: '',
      charCount: 0,
      charLimit: 150,
      imgFile: '',
      imgUrl: '',
      liftedCrop: {},
      url: '',
    }
  }

  isTextLTEtoLimit = () => isLessThanOrEqual(this.state.charLimit);

  handleErrors = data => {
    console.log('data: ', data);
    console.log('err: ', data._message)
  }

  handleSuccess = data => {
    console.log('success: ', data);
    this.setState({
      announcementText: '',
      charCount: 0,
      imgFile: '',
      imgUrl: '',
      liftedCrop: {},
      url: '',
    });
    this.img.current.value = '';
    this.props.addAnnouncement(data.announcement);
  }

  liftAnnouncementText = announcementText => {
    this.setState((prevState, props) => {
      const { allowTypingPastLimit } = prevState;
      const newState  = allowTypingPastLimit
                      ? { charCount: announcementText.length, announcementText: announcementText }
                      : this.isTextLTEtoLimit()(announcementText.length)
                        ? { charCount: announcementText.length, announcementText: announcementText }
                        : { charCount: announcementText.length - 1 };
      return newState;
    });
  }

  liftCrop = crop => {
    this.setState({ crop });
  }

  // handleImgBtnClick = e => {
  //   e.preventDefault()
  // }

  handleImgChange = e => {
    const imgFile = e.target.files[0]
    // console.log('file: ', file);
    this.setState({ imgFile });

    const reader = new FileReader();
    reader.onloadend = () => {
      // console.log('reader result: ', reader.result)
      this.setState({ imgUrl: reader.result });
    }
    reader.readAsDataURL(imgFile);
  }

  handleSubmit = e => {
    e.preventDefault();
    const { announcementText, crop, imgFile, url } = this.state;
    const { height, width, x, y } = crop;
    const formData = new FormData();
    formData.set('announcementText', announcementText);
      formData.set('height', height);
    formData.set('width', width);
    formData.set('x', x);
    formData.set('y', y);
    formData.append('imgFile', imgFile);
    formData.set('url', url);
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    };
    postWithAxios(formData, config).then(result => {
      const { data } = result;
      data.errors ? this.handleErrors(data) : this.handleSuccess(data);
      this.setState({ announcementText: '' });
    });
  }

  componentDidMount() {
    this.setState((prevState, props) => {
      const { allowTypingPastLimit, charLimit } = props;
      return {
        allowTypingPastLimit: false || allowTypingPastLimit,
        charLimit: charLimit || 150,
      };
    });
  }

  render() {
    const { allowTypingPastLimit, announcementText, charLimit, imgUrl, url } = this.state;
    const disabled = this.isTextLTEtoLimit()(announcementText.length) ? '' : 'disabled';
    return (
      <section className='AddAnnouncement'>
        <form encType="multipart/form-data" className='AddAnnouncement__form' onSubmit={this.handleSubmit}>
          <div className='AddAnnouncement__form__announcement-wrap'>
            <label htmlFor='new-announcement-text'>Announcement</label>
              <TextAreaCharCount
                allowTypingPastLimit={allowTypingPastLimit}
                charLimit={charLimit}
                id='new-announcement-text'
                liftText={this.liftAnnouncementText}
                divClass='AddAnnouncement__form__tacc-wrap-div'
                pClass='AddAnnouncement__form__tacc-wrap-div__p'
                textareaClass='AddAnnouncement__form__tacc-wrap-div__textarea'
                required
                text={announcementText}
              />
            </div>
            <div className='AddAnnouncement__form__url-wrap'>
              <label htmlFor='new-announcement-url'>URL</label>
              <input
                id='new-announcement-url'
                name='imgUrl'
                onChange={e => this.setState({url: e.target.value})}
                type='text'
                value={url}
              />
            </div>
            <div className='AddAnnouncement__form__img-wrap'>
              <label htmlFor='new-announcement-img'>Image</label>
              {/* <button onClick={this.handleImgBtnClick}>Choose an image</button> */}
              <input
                id='new-announcement-img'
                name='imgFile'
                onChange={this.handleImgChange}
                ref={this.img}
                type='file'
              />
              {/* <img src={imgUrl} /> */}
              {/* <div style={{ height: '30vh', background: 'green', }}> */}
                <ImgCrop liftCrop={this.liftCrop} src={imgUrl} />
              {/* </div> */}
            </div>
          <button className={disabled} disabled={disabled} type='submit'>Add Announcement</button>
        </form>
      </section>
    );
  }
}
