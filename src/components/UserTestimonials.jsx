import { Fade } from "react-awesome-reveal";
import { Star } from "lucide-react";

const UserTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      feedback:
        "The visa process was seamless, and the team was very supportive.",
      rating: 5,
      country: "USA",
    },
    {
      id: 2,
      name: "Maria Garcia",
      feedback:
        "I received my visa within days. Highly recommend their service!",
      rating: 4,
      country: "Spain",
    },
    {
      id: 3,
      name: "Ahmed Khan",
      feedback: "Excellent service! Professional and fast.",
      rating: 5,
      country: "UAE",
    },
  ];

  return (
    <div className="my-12 bg-gray-50 p-8 rounded-lg shadow-md">
      <Fade>
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          User Testimonials
        </h2>
      </Fade>
      <Fade direction="up" cascade>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 border rounded-lg shadow-lg bg-white"
            >
              <h3 className="text-xl font-bold text-gray-800">
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-500">{testimonial.country}</p>
              <p className="text-gray-700 my-4">{testimonial.feedback}</p>
              <div className="flex items-center gap-1">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star key={index} className="text-yellow-500 w-5 h-5" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Fade>
    </div>
  );
};

export default UserTestimonials;
