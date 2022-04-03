import axios from "axios";
import { Component } from "react";



const api = axios.create({
    baseURL: `https://localhost:5001/api/v1/`
})

class SinglePost extends Component {
    state = {
        post: []
    }
    constructor(props) {
        super(props);
        api.get(`posts/9a6b5be6-b3ef-4c2d-a36b-08da14c62914`).then(res => {
            console.log(res.data)
            this.setState({ post: res.data })
        })
    }

    render() {
        //const dupa = JSON.parse(this.state.post)
        return (
            <div>
                {this.state.post.title}
            </div>
        )
    }
}

export default SinglePost;