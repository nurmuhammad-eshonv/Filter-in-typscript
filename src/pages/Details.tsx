import { useParams } from "react-router-dom";
import data from "../assets/data.json";
import { useNavigate } from "react-router-dom";
interface Product {
  id: any;
  title: string;
  company: string;
  description: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  category: string;
  image: string;
  price: string; 
  shipping: boolean;
  colors: string[];
}

const Details = () => {
  const navigate = useNavigate()

  const { id } = useParams<{ id: string }>();
  const product = data.find((item: Product) => item.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-[1100px] mt-20 mx-auto flex items-start p-10 text-white">
      <div className="flex-shrink-0">
        <img
          className="w-[400px] h-[400px] rounded-lg"
          src={product.image}
          alt={product.title}
        />
      </div>
      <div className="ml-10">
        <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
        <h2 className="text-xl text-gray-400 mb-4">{product.company}</h2>
        <p className="text-2xl text-green-400 mb-4">${product.price}</p>
        <p className="text-lg mb-4">{product.description}</p>

        <div className="flex items-center mb-4">
          <span className="mr-2 text-lg">Colors:</span>
          {product.colors.map((color, index) => (
            <span
              key={index}
              className="w-6 h-6 rounded-full mr-2"
              style={{ backgroundColor: color }}
            ></span>
          ))}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-lg">Amount</label>
          <select className="p-2 rounded-md bg-gray-800 text-white">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>

        <button className=" mr-2 bg-purple-600 text-white py-2 px-4 rounded-lg">
          ADD TO BAG
        </button> 
        <button onClick={() => {navigate("/")}} className="bg-purple-600 text-white py-2 px-4 rounded-lg">
          BACK TO HOME
        </button>
      </div>
    </div>
  );
};

export default Details;
