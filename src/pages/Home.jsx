import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import VisaCard from "../components/VisaCard";
import banner1 from "../assets/360_F_204229925_uUGpjGtjr1GRYKtT74ZhcYPrHsW3pbQa.jpg";
import banner2 from "../assets/passkontrolle.jpg";
import banner3 from "../assets/Visa Banner - Passport2.png";

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
      {/* banner */}
      <div className="my-8">
        <Carousel
          className="w-full"
          showThumbs={false}
          autoPlay
          interval={3000}
          infiniteLoop
        >
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
            <img src={banner1} alt="Banner 1" />
          </div>
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
            <img src={banner2} alt="Banner 2" />
          </div>
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
            <img src={banner3} alt="Banner 3" />
          </div>
        </Carousel>
      </div>

      {/* latest */}
      <h2 className="text-3xl font-bold text-center my-6">Latest Visas</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestVisas.map((visa) => (
          <VisaCard key={visa._id} visa={visa} />
        ))}
      </div>
      <div className="text-center mt-6">
        <Link
          to="/all-visas"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          See All Visas
        </Link>
      </div>

      {/* extra */}
      <div className="my-12">
        <h2 className="text-2xl font-bold text-center">Why Choose Us?</h2>
        <p className="text-center text-gray-600 mt-2">
          We offer the fastest and most reliable visa processing services
          worldwide.
        </p>
      </div>

      <div className="my-12">
        <h2 className="text-2xl font-bold text-center">User Testimonials</h2>
        <p className="text-center text-gray-600 mt-2">
          Hear from our satisfied customers who successfully got their visas
          through us.
        </p>
      </div>
    </div>
  );
};

export default Home;
