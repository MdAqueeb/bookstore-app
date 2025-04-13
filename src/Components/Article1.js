import React from "react";
import { Link } from "react-router-dom";
import ArticalImage from "../assests/image1.jpg";

const Article1 = () => {
    return (
        <div className="OuterDiv flex justify-between items-center p-8">
            <div className="w-1/2">
                <h1 className="text-3xl font-bold mb-4">
                Your next great adventure starts with a book—shop online now!
                </h1>
                 
                <Link to="/allbooks" className="inline-block">
                    <button className="btn-login bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                        Explore Books -{">"}
                    </button>
                </Link>
            </div>
            <div className="w-1/2">
                <img src={ArticalImage} alt="Featured books" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
        </div>
    );
};

export default Article1;