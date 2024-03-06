import AddPost from "./AddPost";
import { PostData } from "./AddPost";


const onSubmit = (data: PostData) => {

    console.log("final post values:")
    console.log(data)

}

function AddPostParent() {
    return (
            <AddPost onSubmit={onSubmit}/>
    );
}

export default AddPostParent;