import React from 'react';

import TextAreaCharCount from '../../components/TextAreaCharCount';

export default class AnnouncementStrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charCount: 0,
      editable: false,
      announcementText: '',
    }
  }

  toggleEdit = () => {
    this.setState({ editable: !this.state.editable });
  }

  handleEditAnnouncement = (announcementText, id) => {
    // console.log('edited');
    this.toggleEdit();
    // if (announcementText !== this.prevState.announcementText) this.props.editAnnouncement(announcementText, id);
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

  componentDidMount() {
    const { text } = this.props;
    this.setState({ announcementText: text, charCount: text.length })
  }

  render() {
    const { deleteAnnouncement, id } = this.props;
    const { editable, announcementText } = this.state;
    const btn = editable
              ? <button onClick={() => this.handleEditAnnouncement(announcementText, id)}>Done</button>
              : <button onClick={this.toggleEdit}>Edit</button>;
    const announcement  = editable
                        ? <TextAreaCharCount charLimit={150} liftText={this.liftAnnouncementText} text={announcementText} />
                        : <p className='text'>{announcementText}</p>;
    return (
      <div className='announcement-row'>
        {announcement}
        {btn}
        <button onClick={() => deleteAnnouncement(id)}>Delete</button>
      </div>
    );
  }
}
