import React from 'react';

interface PostProps {
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    postedAt: string; // ISO date string
}

const Post: React.FC<PostProps> = ({ title, description, price, imageUrl, postedAt }) => {
    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <p className="mt-2 text-gray-600">{description}</p>
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">${price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500">{new Date(postedAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};

export default Post;
