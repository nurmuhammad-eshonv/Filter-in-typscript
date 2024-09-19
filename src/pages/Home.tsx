import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../assets/data.json";

interface Product {
  id: number;
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

function Home() {
  const [search, setSearch] = useState<string>(() => localStorage.getItem("search") || "");
  const [category, setCategory] = useState<string>(() => localStorage.getItem("category") || "all");
  const [company, setCompany] = useState<string>(() => localStorage.getItem("company") || "");
  const [shipping, setShipping] = useState<boolean>(() => localStorage.getItem("shipping") === "true");

  useEffect(() => {
    localStorage.setItem("search", search);
  }, [search]);

  useEffect(() => {
    localStorage.setItem("category", category);
  }, [category]);

  useEffect(() => {
    localStorage.setItem("company", company);
  }, [company]);

  useEffect(() => {
    localStorage.setItem("shipping", shipping.toString());
  }, [shipping]);

  function handleClear() {
    setSearch("");
    setCategory("all");
    setCompany("");
    setShipping(false);
    localStorage.clear();
  }

  return (
    <>
      <nav>
        <div>
          <div>
            <form className="max-w-[1100px] mx-auto" action="">
              <div className="div-1 mt-[30px] bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
                <div>
                  <label htmlFor="search">Search Product</label>
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    id="search"
                    value={search}
                    className="input input-bordered w-full h-[32px]"
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="option">Select Category</label>
                  <select
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                    value={category}
                    id="option"
                    className="select select-bordered w-full select-xs font-[700] h-[32px]"
                  >
                    <option>All</option>
                    <option>Tables</option>
                    <option>Chairs</option>
                    <option>Sofas</option>
                    <option>Beds</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="company">Select Company</label>
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
                    id="company"
                    value={company}
                    className="input input-bordered w-full h-[32px]"
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="sortOrder">Sort By</label>
                  <select id="sortOrder" className="select select-bordered w-full font-[700] select-xs h-[32px]">
                    <option>a-z</option>
                    <option>z-a</option>
                    <option>high</option>
                    <option>low</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="priceRange" className="text-[14px] flex justify-between font-[600]">
                    <span>Select Price</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max="10000"
                    className="range range-primary"
                  />
                  <label className="text-[13px] flex justify-between font-[600]">
                    <span>Max: $1.000.00</span>
                  </label>
                </div>
                <div className="flex flex-col items-center">
                  <label htmlFor="checkbox">Free shipping</label>
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShipping(e.target.checked)}
                    checked={shipping}
                    type="checkbox"
                    name="shipping"
                    className="mt-2 checkbox checkbox-primary checkbox-sm"
                  />
                </div>
                <button type="button" className="btn btn-sm btn-primary">Filter</button>
                <button
                  onClick={handleClear}
                  type="button"
                  className="btn btn-sm btn-secondary"
                >
                  Reset
                </button>
              </div>
            </form>
            <div className="bg-base-200 my-7 py-3 rounded-[8px] flex justify-between max-w-[1100px] mx-auto">
              <p className="text-[20px] font-[600] mx-[20px]">Products</p>
            </div>
          </div>
        </div>
      </nav>
      <div className=" max-w-[1400px] mx-auto justify-center flex flex-wrap gap-16 cont">
        {data
          .filter((item: Product) => {
            return search.toLowerCase() === ""
              ? item
              : item.title.toLowerCase().includes(search);
          })
          .filter((item: Product) => {
            return category.toLowerCase() === "all" || category === ""
              ? item
              : item.category.toLowerCase() === category.toLowerCase();
          })
          .filter((item: Product) => {
            return company.toLowerCase() === ""
              ? item
              : item.company.toLowerCase().includes(company);
          })
          .filter((item: Product) => {
            return !shipping || item.shipping === true;
          })
          .map((item: Product, index: number) => (
            <Link key={index} to={`/details/${item.id}`}>
              <div className="card bg-base-100 w-96 shadow-xl mt-16">
                <figure>
                  <img className="w-80 h-80 rounded-[20px]" src={item.image} alt={item.title} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-center justify-center text-3xl mb-3">{item.title}</h2>
                  <div className="badge w-32 h-6 badge-secondary">{item.category}</div>
                  <p className="text-orange-400">
                    <span className="text-green-400 text-2xl">company: </span>
                    {item.company}
                  </p>
                  <p className="text-3xl">PRICE: {item.price} $</p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline flex">
                      <span className="mr-3 mb-1">FREE shipping</span>
                      <input className="mt-0" type="checkbox" checked={item.shipping} readOnly />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}

export default Home;
