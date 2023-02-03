import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost, getPost, updatePost } from "../redux/features/PostSlice";
import { setEdit } from "../redux/features/PostSlice";
import Sippner from "./Sippner";

const Posts = () => {
  const [id, setId] = useState("");
  const [textBody, setTextBody] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, post, body, edit } = useSelector((state) => ({
    ...state.app,
  }));

  useEffect(() => {
    if (body) {
      setTextBody(body);
    }
  }, [body]);

  const handleFetchData = (e) => {
    e.preventDefault();
    if (!id) {
      window.alert("Please Provide Post ID");
    } else {
      dispatch(getPost({ id }));
      setId("");
    }
  };

  const handleDelete = ({ id }) => {
    dispatch(deletePost({ id: post[0].id }));
    window.location.reload();
    window.alert("post deleted !");
  };

  return (
    <>
      <div className="container">
        <form>
          <div className="row d-flex justify-content-center m-3">
            <label for="exampleInputSearch" class="form-label">
              Search By Id
            </label>
            <input
              type="number"
              class="form-control"
              value={id}
              onChange={(e) => setId(e.target.value)}
              id="exampleInputSearch"
              aria-describedby="emailHelp"
            />
          </div>
          <button
            onClick={handleFetchData}
            type="submit"
            class="btn btn-primary"
          >
            Fetch
          </button>
          <button
            onClick={() => navigate("/createpost")}
            type="submit"
            class="btn btn-primary ms-5"
          >
            create
          </button>
        </form>
      </div>

      <div className="container">
        {loading ? (
          <Sippner />
        ) : (
          <>
            {post.length > 0 && (
              <>
                <div className="card mt-4">
                  <div className="card-body">
                    <h5 className="card-title">{post[0].title}</h5>
                    {edit ? (
                      <>
                        <textarea
                          className="form-control"
                          value={textBody}
                          onChange={(e) => setTextBody(e.target.value)}
                          id="floatingTextarea"
                        />
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            dispatch(
                              updatePost({
                                id: post[0].id,
                                title: post[0].title,
                                body: textBody,
                              })
                            )
                            dispatch(setEdit({edit:false,body:''}))
                          }}
                        >
                          Save
                        </button>
                        <button className="btn btn-danger ms-4" 
                            onClick={()=>
                            dispatch(setEdit({edit:false,body:''}))

                            }
                        >Cancle</button>
                      </>
                    ) : (
                      <>
                        <p className="card-text">{post[0].body}</p>
                      </>
                    )}

                    {!edit && (
                      <div className="d-flex align-items-end justify-content-end">
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            dispatch(
                              setEdit({ edit: true, body: post[0].body })
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-4"
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Posts;
