import React from 'react';

import TextAreaCharCount from '../../components/TextAreaCharCount';

export default class AnnouncementStrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charCount: 0,
      editable: false,
      text: '',
    }
  }

  toggleEdit = () => {
    this.setState({ editable: !this.state.editable });
  }

  editAnnouncement = () => {
    console.log('edited');
    this.toggleEdit();
  }

  handleChange = e => {
    e.preventDefault();
    const { value } = e.target;
    value.length <= 150 ? this.setState({ charCount: value.length, text: value })
                        : this.setState({ charCount: value.length - 1});
  }

  componentDidMount() {
    const { announcementText } = this.props;
    this.setState({ text: announcementText, charCount: announcementText.length })
  }

  render() {
    const { deleteAnnouncement, id, announcementText } = this.props;
    const { charCount, editable, text } = this.state;
    const turnRed = charCount === 150 ? 'warning-red' : '';
    const btn = editable
              ? <button onClick={this.editAnnouncement}>Done</button>
              : <button onClick={this.toggleEdit}>Edit</button>;
    const announcement  = editable
                        // ? <div>
                        //     <textarea onChange={this.handleChange} value={text}></textarea>
                        //     <p className={`${turnRed} char-count`}>{charCount} / 150</p>
                        //   </div>
                        ? <TextAreaCharCount text={text} />
                        : <p className='text'>{text}</p>;
    return (
      <div className='announcement-row'>
        {announcement}
        {btn}
        {/* <p>{text}</p> */}
        {/* <button onClick={this.toggleEdit}>Edit</button> */}
        <button onClick={() => deleteAnnouncement(id)}>Delete</button>
      </div>
    );
  }
}
