import React from 'react';

import TextAreaCharCount from '../../components/TextAreaCharCount';

export default class AnnouncementStrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      announcementText: '',
      charCount: 0,
      editable: false,
      height: 0,
      width: 0,
    }
  }

  toggleEdit = () => {
    this.setState({ editable: !this.state.editable });
  }

  handleEditAnnouncement = (announcementText, id) => {
    this.toggleEdit();
    this.props.editAnnouncement(announcementText, id);
  }

  liftAnnouncementText = announcementText => {
    announcementText.length <= 150  ? this.setState({ charCount: announcementText.length, announcementText: announcementText })
                                    : this.setState({ charCount: announcementText.length - 1});
  }

  handleChange = e => {
    e.preventDefault();
    const { value } = e.target;
    value.length <= 150 ? this.setState({ charCount: value.length, text: value })
                        : this.setState({ charCount: value.length - 1});
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerheight });
  }

  componentDidMount() {
    const { text } = this.props;
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.setState({ announcementText: text, charCount: text.length })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    const { deleteAnnouncement, id } = this.props;
    const { announcementText, editable, width } = this.state;
    const btn = editable
              ? <button onClick={() => this.handleEditAnnouncement(announcementText, id)}>Done</button>
              : <button onClick={this.toggleEdit}>Edit</button>;
    const announcement  = editable
                        ? <TextAreaCharCount
                          charLimit={150}
                          liftText={this.liftAnnouncementText}
                          text={announcementText}
                          divClass='announcement-row__text-wrap-div'
                          pClass='announcement-row__text-wrap-p'
                          textareaClass='announcement-row__text-wrap-textarea'
                        />
                        : <p className='text'>{announcementText}</p>;
    return (
      <div className='AnnouncementStrip'>
        <div className='announcement-row'>
          {announcement}
          <div className='announcement-row__btn-wrap'>
            {btn}
            <button onClick={() => deleteAnnouncement(id)}>Delete</button>
          </div>
        </div>
        <div className='likes-wrapper'>
          <p>Likes: 1000</p>
        </div>
      </div>
    );
  }
}
