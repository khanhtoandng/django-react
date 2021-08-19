import React from 'react';
import '../style.css';
import PropTypes from 'prop-types';

const ImageSlide = (props) => {
  const {
    img, handleOnChange, handleOnRemove, handleModalShow,
  } = props;

  return (

    <div className="row image-slide-div">
      {
           Object.keys(img).map((item) => (
             <div key={item} className="col-md-5 image-div ">
               <label htmlFor={item}>
                 <div className="show-image">
                   {img[item].image ? (
                     <img
                       className="img-upload"
                       src={img[item].image}
                       alt="dummy"
                       width="300"
                       height="300"
                       style={{ borderRadius: '20px' }}
                     />
                   ) : null}
                   {
                     (img[item].image !== 'https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png') ? (
                       <>
                         <input
                           className="update btn btn-outline-danger btn-sm"
                           type="button"
                           value="update"
                           onClick={() => handleOnRemove(img[item])}
                         />
                         <input
                           className="preview btn btn-outline-primary btn-sm"
                           type="button"
                           value="Preview"
                           onClick={() => handleModalShow(img[item].image)}
                         />
                       </>
                     ) : null
                    }
                 </div>
               </label>
               <input
                 type="file"
                 id={item}
                 style={{ display: 'none' }}
                 onChange={(e) => handleOnChange(e, img[item])}
               />
             </div>
           ))
       }
    </div>

  );
};

ImageSlide.propTypes = {
  img: PropTypes.object,
  handleOnChange: PropTypes.func,
  handleOnRemove: PropTypes.func,
  handleModalShow: PropTypes.func,
};

ImageSlide.default = {
  img: {},
  handleOnChange: null,
};

export default ImageSlide;
