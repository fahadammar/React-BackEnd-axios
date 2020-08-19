import React, { Component } from "react";
import axios from "axios";
import "./App.css";

// axios interceptor
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;

  if (!expectedError) {
    console.log("UnExpected Error", error);
    alert("An unexpected Error Occurred");
  }

  return Promise.reject(error);
});

// URL
const apiEndPoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: [],
  };

  // LifeCycle Hook
  async componentDidMount() {
    const { data: posts } = await axios.get(apiEndPoint);
    this.setState({ posts });
  }

  // Handle Methods
  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(apiEndPoint, obj);

    const posts = [post, ...this.state.posts];

    this.setState({ posts });
  };

  handleUpdate = (post) => {
    post.title = "UPDATED";
    const posts = [...this.state.posts];

    // find the index of following post
    const index = posts.indexOf(post);

    // add the all prop. of post in posts
    posts[index] = { ...post };

    this.setState({ posts });
  };

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter((p) => p.id !== post.id);

    this.setState({ posts });

    try {
      await axios.delete(apiEndPoint + "/999" + post.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("This post has already been deleted");

      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;

// The right place to get the Data from the Server, is the componentDidMount() lifecycle hook

/*
At the componentDidMount() if axios.get() don't get the data from the server, the interceptor kicks-In
and log the error; the error alert. Also on request of Delete or Update if we don't get the response from the server, the interceptor Kicks-In!! Leave the un-expected Errors to the interceptor
*/
