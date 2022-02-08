import React from 'react';
import { useSelector } from 'react-redux';

import './modal.css';
import AddSong from '../../pages/AddSong'
import Card from '../elements/Card';

import { authSelector } from '../../redux/auth/auth-selectors';
import { trackSelector } from '../../redux/track/track-selectors';

function Modal() {
  
  const { currentUser } = useSelector(authSelector);
  const { trackEditing } = useSelector(trackSelector);

  const { title, genre, thumbnail } = trackEditing

  const track = {
    userId: currentUser._id,
    title: title,
    genre: genre,
    // url: "",
    thumbnail: thumbnail,
  }

  return (
    <div id="editing-modal" className='light'>
      <Card>
          <AddSong isEditing trackEditing={track} />
      </Card>
    </div>
  );
}

export default Modal;
