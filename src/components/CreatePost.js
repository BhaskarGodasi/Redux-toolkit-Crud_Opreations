import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "./../redux/features/PostSlice";
import Sippner from "./Sippner";

const CreatePost = () => {
  const [ values, setValues ] = useState({ title: "", body: "" });
  const [showPost, setShowPost] = useState(false)
  const { loading, post } = useSelector((state) => ({ ...state.app }));
  const { title, body } = values;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ values }));
    setValues({ title:'',body:''});
    setShowPost(true);
  };
  const handlechange =(event)=>{
    setValues({...values, [event.target.name]:event.target.value})
 }

  const showCreatedPost = () => {
    return (
      <>
        {loading ? (
          <Sippner />
        ) : (
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">{post[0].title}</h5>
              <p className="card-text">{post[0].body}</p>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <h1 className="text-center bg-dark text-white p-2">Create Post </h1>
      <form action="">
        <div className="mb-3 mt-4">
          <input
            type="text"
            value={title}
            name='title'
            //onChange={(e) => setValues({ ...values, title: e.target.value })}
            onChange={handlechange}
            placeholder="Enter Post Title"
            className="form-control"
            id="exampleInputId"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            value={body}
            name='body'
            //onChange={(e) => setValues({ ...values, body: e.target.value })}
            onChange={handlechange}
            placeholder="add post description"
            id="floatingTextarea"
          />
          <label htmlFor="floatingTextarea">add post description</label>
        </div>
        <div className="mt-4 d-flex align-items-end justify-content-end">
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Go Home
          </button>
          <button
            className="btn btn-danger ms-4"
            type="submit"
            onClick={handleSubmit}
          >
            submit
          </button>
        </div>
      </form>
      <div className="mt-4">
        {showPost && <div>{showCreatedPost()}</div>}
      </div>
    </div>
  );
};

export default CreatePost;
