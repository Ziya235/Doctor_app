import React, { useState } from 'react';
import { assets } from '../assets/assets';

const About = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile)); // Create a preview URL
    }
  };

  return (
    <div>
      <label
        htmlFor="file-upload"
        style={{
          display: 'inline-block',
          cursor: 'pointer',
          width: '150px',
          height: '150px',
          border: '2px dashed #ccc',
          borderRadius: '50%',
          textAlign: 'center',
          lineHeight: '150px',
          background: file ? `url(${file}) center/cover no-repeat` : '#f9f9f9',
        }}
      >
              {!file && (
          <img
            src={assets.about_image}
            alt="Placeholder"
            style={{
              borderRadius: '50%',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
      </label>
      <input
        id="file-upload"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default About;
