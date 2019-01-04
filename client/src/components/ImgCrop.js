import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default class ImgCrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crop: {
        aspect: 4/3,
        width: 30,
        x: 30,
        y: 30,
      },
    };
  }

  handleOnChange = crop => {
    // console.log('crop: ', crop);
    this.setState({ crop });
  }

  // getCroppedImg(image, pixelCrop, fileName) {
  //   console.log('type: ', typeof image)
  //
  //   const canvas = document.createElement('canvas');
  //   canvas.width = pixelCrop.width;
  //   canvas.height = pixelCrop.height;
  //   const ctx = canvas.getContext('2d');
  //
  //   console.log('canvas: ', canvas);
  //   console.log('ctx: ', ctx);
  //
  //   ctx.drawImage(
  //     image,
  //     pixelCrop.x,
  //     pixelCrop.y,
  //     pixelCrop.width,
  //     pixelCrop.height,
  //     0,
  //     0,
  //     pixelCrop.width,
  //     pixelCrop.height
  //   );
  //
  //   // As a blob
  //   return new Promise((resolve, reject) => {
  //     canvas.toBlob(blob => {
  //       blob.name = fileName;
  //       resolve(blob);
  //     }, 'image/jpeg');
  //   });
  // }

  // async test(image, pixelCrop, returnedFileName) {
  //   const croppedImg = await this.getCroppedImg(image, pixelCrop, returnedFileName);
  //   console.log('croppedImg: ', croppedImg);
  // }

  render() {
    const { src } = this.props;
    return (
      <>
        <ReactCrop
          crop={this.state.crop}
          keepSelection={true}
          onChange={crop => this.handleOnChange(crop)}
          // onComplete={crop => this.getCroppedImg(src, crop, 'foofoofoo')}
          // onComplete={crop => this.test(src, crop, 'foofoofoo')}
          src={src}
          style={{ width: '50%' }}
        />
      </>
    );
  }
}
