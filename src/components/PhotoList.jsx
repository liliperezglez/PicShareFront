import Photo from './Photo';

function PhotoList({ photos, removePost, toggleLike, editComment, addComment, removeComment, tokenCaducadoVisible, setTokenCaducadoVisible }) {
  return photos.length ? (
    <ul className='photo-list'>
      {photos.map((photo) => {
        return (
          <li key={photo.idEntry}>
            <Photo
              tokenCaducadoVisible={tokenCaducadoVisible}
              setTokenCaducadoVisible={setTokenCaducadoVisible}
              photo={photo}
              removePost={removePost}
              removeComment={removeComment}
              addComment={addComment}
              editComment={editComment}
              toggleLike={toggleLike}
            />
          </li>
        );
      })}
    </ul>
  ) : (
    <p className='p-photo-list'>No se encontraron publicaciones...</p>
  );
}

export default PhotoList;
