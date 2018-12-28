import React from 'react';

export default class AnnouncementStrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
    }
  }

  toggleEdit = () => {
    this.setState({ editable: !this.state.editable });
  }

  render() {
    const { deleteAnnouncement, id, text } = this.props;
    return (
      <div className='announcement-row'>
        <p>{text}</p>
        <button onClick={this.toggleEdit}>Edit</button>
        <button onClick={() => deleteAnnouncement(id)}>Delete</button>
      </div>
    );
  }
}
