import { Fade } from "react-awesome-reveal";
import { CheckCircle } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    { id: 1, text: "Fast and reliable visa processing services." },
    { id: 2, text: "24/7 customer support for all queries." },
    { id: 3, text: "Highly experienced and professional team." },
    { id: 4, text: "Transparent and competitive pricing." },
    { id: 5, text: "Secure and hassle-free application process." },
  ];

  return (
    <div className="my-12 bg-blue-50 p-8 rounded-lg shadow-md items-center">
      <Fade>
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Why Choose Us?
        </h2>
      </Fade>
      <Fade direction="up" cascade>
        <ul className="space-y-4">
          {reasons.map((reason) => (
            <li key={reason.id} className="flex items-center gap-4">
              <CheckCircle className="text-blue-600 w-6 h-6" />
              <p className="text-gray-800">{reason.text}</p>
            </li>
          ))}
        </ul>
      </Fade>
    </div>
  );
};

export default WhyChooseUs;
