import '../../../Home/Home.css';

function AuthorInfoAndCreateDate(props) {
    var date = new Date(props.created)
    var stringifiedDate = date.toLocaleDateString("es-PE");
    if (props.showInfo) {
    return (
        <div className="post-author-and-info">
            <img className="card-author-avatar" src={'data:image/jpeg;base64,' + props.authorPic} />
            <p className="author-name-and-date">{props.authorName}</p>
            <div className="vr"></div>
            <p className="author-name-and-date">{stringifiedDate}</p>
        </div>
    );}
    else {
        return (<div></div>);
    }
}

export default AuthorInfoAndCreateDate;