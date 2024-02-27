import AddPost from "./AddPost";
import { NewPostData } from "./AddPost";


const onSubmit = (data: NewPostData) => {

    console.log("final post values:")
    console.log(data)

}

function AddPostParent() {
    return (
            <AddPost onSubmit={onSubmit}/>
    );
}

export default AddPostParent;