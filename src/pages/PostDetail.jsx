import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../store/reducers/postSlice";
import { toastMessage } from "../helper";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    state.posts.list.find((p) => p.id === Number(id))
  );

  const [edited, setEdited] = useState({ title: "", body: "" });

  useEffect(() => {
    if (post) {
      setEdited({ title: post.title, body: post.body });
    }
  }, [post]);

  const handleSave = () => {
    //change to redux store
    dispatch(updatePost({ ...post, ...edited }));
    toastMessage("Güncelleme işlemi başarıyla gerçekleştirildi", "success");
  };

  if (!post)
    return <div className="text-center mt-10 text-gray-500">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Post detail</h1>
          <button
            onClick={() => navigate("/posts")}
            className="text-sm text-blue-600 underline"
          >
            ← Back to List
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={edited.title}
              onChange={(e) => setEdited({ ...edited, title: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              name="body"
              rows="6"
              value={edited.body}
              onChange={(e) => setEdited({ ...edited, body: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          <div className="flex gap-2 items-center ">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
            >
              Save
            </button>
            <button
              onClick={() => navigate("/posts")}
              className="bg-gray-400  text-white font-semibold px-6 py-2 rounded-md transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
