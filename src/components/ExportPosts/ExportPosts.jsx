import React from 'react'
import { useSelector } from "react-redux";
import * as PostsApi from "../../api/PostsRequests";
const ExportPosts = () => {
    const user = useSelector((state) => state.authReducer.authData);

    const handleExportPost = async (userId) => {
        await PostsApi.exportPost(userId).then(response => {
            //Create a Blob from the PDF Stream
            const file = new Blob(
                [response.data],
                { type: 'application/pdf' });
            const filename = response.headers["content-disposition"].split("filename=")[1];
            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
            //Open the URL on new Window
            var a = document.createElement("a")
            a.href = fileURL
            a.download = filename
            a.click();
        })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <button className="button r-button" onClick={() => { handleExportPost(user.userId) }} data-test="ExportPosts-Test">Export My Posts</button>
    )
}

export default ExportPosts