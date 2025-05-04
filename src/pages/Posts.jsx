import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPosts } from "../store/reducers/postSlice";
import {
  LiaProductHunt,
  CiSearch,
  IoMdLogIn,
  CgProfile,
  FaUser,
} from "../components/Icons";

import PostChart from "../components/PostChart";

const Posts = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.list);

  const userData = localStorage.getItem("userEmail");
  const userEmail = JSON.parse(userData);

  useEffect(() => {
    if (posts.length === 0) {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((res) => {
          dispatch(setPosts(res.data));
          setLoading(false);
        })
        .catch((err) => console.error("Veri alınamadı", err));
    } else {
      setLoading(false);
    }
  }, [dispatch, posts.length]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  const filtered = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="w-full flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
            {/* breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className=" hover:underline">Home</span>
              <span className="text-gray-400">/</span>
              <span className="font-semibold text-gray-800">Posts</span>
            </div>

            <div className=" flex flex-col sm:flex-row gap-3 sm:items-center justify-end">
              {/* search */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-7 w-full px-4 py-2 border border-transparent rounded-full shadow-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <CiSearch className="absolute right-3 top-3" />
              </div>

              <div className="relative profile-dropdown">
                <div
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="border rounded-full p-2 cursor-pointer hover:bg-gray-100 transition"
                >
                  <CgProfile size={22} color="gray" />
                </div>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <div className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white flex items-center gap-2">
                      <FaUser size={16} />
                      <span>{userEmail.companyCode}</span>
                    </div>

                    <button
                      onClick={() => {
                        localStorage.removeItem("userEmail");
                        navigate(`/`);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white flex items-center gap-2"
                    >
                      <IoMdLogIn size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <PostChart posts={posts} />
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate(`/posts/${post.id}`)}
              className="bg-white rounded-xl border border-transparent p-6 shadow-xl hover:shadow-md-lg cursor-pointer transition-all"
            >
              <div className="flex items-center gap-5 justify-between w-full">
                <h4 className="text-md max-w-24 font-semibold text-gray-800 mb-2 line-clamp-1">
                  {post.title}
                </h4>
                <LiaProductHunt size={25} color="#1e90ff" />
              </div>
              <p className="text-gray-600 text-sm line-clamp-4">{post.body}</p>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-gray-500 text-sm mt-6">
            There is no result found for your search...
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
