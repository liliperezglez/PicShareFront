import React, { useState } from "react";
import UserInfo from "./UserInfo";
import Modal from "./Modal";
import DeletePost from "./DeletePost";
import UserDescription from "./UserDescription";

function Photo({ photo, removePost, addComment }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function calculateTimeDifference(date) {
    const currentDate = new Date();
    const postDate = new Date(date);
    const timeDifference = currentDate - postDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `Hace ${days} D.`;
    } else if (hours > 0) {
      return `Hace ${hours} h.`;
    } else if (minutes > 0) {
      return `Hace ${minutes} min.`;
    } else {
      return `Hace ${seconds} S.`;
    }
  }
  return (
    <article className="photo">
      <div className="userPostInfo">
        <UserInfo user={photo} />
      </div>
      <div className="photoDetails">
        <p className="photoDate">{calculateTimeDifference(photo.date)} </p>
        <p className="photoPlace">{photo.place && photo.place}</p>
        <DeletePost photo={photo} removePost={removePost} />
        <div>
          <img
            onClick={openModal}
            src={`${import.meta.env.VITE_APP_BACKEND.replace(
              /\/+$/,
              ""
            )}/uploads/photos/${photo.idUser}/${photo.photo}`}
            alt={photo.description}
          />
        </div>
        {isModalOpen && (
          <Modal
            photo={photo}
            addComment={addComment}
            closeModal={closeModal}
          />
        )}
      </div>
      <div className="likeANDcommentButtons">
        <p>💘💗 {photo.likes}</p>
        <button className="commentButton" onClick={openModal}>
          💬🗯
        </button>
      </div>
      <UserDescription user={photo} />
    </article>
  );
}

export default Photo;
