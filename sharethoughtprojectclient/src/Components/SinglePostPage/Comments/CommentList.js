import { Button, Form } from "react-bootstrap";
import Comment from "./Comment";

const CommentList = (props) => {

    const comments = [];

    for (let index = 0; index < 5; index++) {
        comments.push(<Comment></Comment>)
    }

    return (
        <div>
            <Form className="d-flex">
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{ width: '100%' }}>
                    <Form.Control as="textarea" rows={3} resize="none" style={{ resize: 'none' }} />
                </Form.Group>
            </Form>
            <Button variant="outline-primary" style={{ marginTop: '-0.5em', marginBottom: '1em' }}>Add comment</Button>
            <div>
                {comments}
            </div>
        </div>);
}

export default CommentList;