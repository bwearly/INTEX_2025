import HeroCarousel from '../../components/common/HeroCarousel';
import MovieRow from '../../components/common/MovieRow';
import Navbar from '../../components/common/Navbar';

const Home = () => {
  return (
    <div className="bg-dark text-white min-h-screen">
      <Navbar />

      <div className="p-4">
        <HeroCarousel />

        {/* Replace these with dynamic categories if desired */}
        <MovieRow title="My List" />
        <MovieRow title="Action" />
        <MovieRow title="Adventure" />
        <MovieRow title="Comedy" />
        <MovieRow title="Dramas" />
        <MovieRow title="Thrillers" />
        <MovieRow title="Family" />
      </div>
    </div>
  );
};

export default Home;
