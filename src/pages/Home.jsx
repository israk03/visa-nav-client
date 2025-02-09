import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import VisaCard from "../components/VisaCard";
import banner1 from "../assets/360_F_204229925_uUGpjGtjr1GRYKtT74ZhcYPrHsW3pbQa.jpg";
import banner2 from "../assets/passkontrolle.jpg";
import banner3 from "../assets/Visa Banner - Passport2.png";
import { Fade } from "react-awesome-reveal";
import Lottie from "lottie-react";
import visaAnimation from "../assets/visa-animation.json";
import WhyChooseUs from "../components/WhyChooseUs";
import UserTestimonials from "../components/UserTestimonials";

const Home = () => {
  const [latestVisas, setLatestVisas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/latest-visas")
      .then((res) => res.json())
      .then((data) => setLatestVisas(data))
      .catch((error) => console.error("Error fetching visas:", error));
  }, []);

  return (
    <div className="container mx-auto px-4">
      {/*  Banner */}
      <div className="relative my-8 overflow-hidden">
        <div className="flex space-x-4 overflow-x-scroll snap-x snap-mandatory scrollbar-hide">
          <div className="snap-center flex-shrink-0 w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
            <img
              src={banner1}
              alt="Banner 1"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
            {/* <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
              <h2 className="text-white text-3xl md:text-5xl font-bold">
                Welcome to Visa Navigator
              </h2>
            </div> */}
          </div>
          <div className="snap-center flex-shrink-0 w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
            <img
              src={banner2}
              alt="Banner 2"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
            {/* <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
              <h2 className="text-white text-3xl md:text-5xl font-bold">
                Hassle-Free Visa Applications
              </h2>
            </div> */}
          </div>
          <div className="snap-center flex-shrink-0 w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
            <img
              src={banner3}
              alt="Banner 3"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
            {/* <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
              <h2 className="text-white text-3xl md:text-5xl font-bold">
                Explore the World with Ease
              </h2>
            </div> */}
          </div>
        </div>
      </div>

      {/*  Animation */}
      <div className="flex justify-center items-center my-10">
        <Lottie animationData={visaAnimation} className="w-50 h-50" />
      </div>

      {/*  Latest Visas Section */}
      <Fade>
        <h2 className="text-3xl font-bold text-center my-6">Latest Visas</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestVisas.map((visa) => (
            <VisaCard key={visa._id} visa={visa} />
          ))}
        </div>
      </Fade>

      <div className="text-center mt-6">
        <Link
          to="/all-visas"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          See All Visas
        </Link>
      </div>

      {/*  Extra Sections with Animations */}
      <WhyChooseUs></WhyChooseUs>
      <UserTestimonials></UserTestimonials>
    </div>
  );
};

export default Home;
