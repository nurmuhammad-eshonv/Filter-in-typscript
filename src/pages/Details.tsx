import { useParams } from "react-router-dom";
import data from "../assets/data.json";

interface Product {
  id: number;  // It's better to explicitly set the type to `number`
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
  const { id } = useParams<{ id: string }>();

  // Ensure that `id` is not undefined and can be parsed to a number
  const product = id ? data.find((item: Product) => item.id === parseInt(id)) : undefined;

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex items-start p-10 bg-gray-900 text-white">
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

        <button className="bg-purple-600 text-white py-2 px-4 rounded-lg">
          ADD TO BAG
        </button>
      </div>
    </div>
  );
};

export default Details;
