import { Link } from "react-router-dom";
import { Loading } from "../components/Loading";
import usePosts from "../hooks/usePosts";

export default function SearchPhotos() {
  const { loading, error } = usePosts;

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Link to="/entries/photos/search" className="searchPhotoButton">
        <button className="searchPhotosButton">🖼🔍fotos</button>
      </Link>
    </>
  );
}
