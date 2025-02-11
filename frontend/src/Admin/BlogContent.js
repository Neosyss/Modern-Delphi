import React, { useState, useEffect } from "react";
import "./BlogContent.css";
import axios from 'axios';
import { IoClose } from "react-icons/io5";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import imagex from '../images/team/2.webp';

const BlogListItem = ({ blog, onClick }) => {
    return (
        <div className='blogListItem d-flex' onClick={() => onClick(blog)}>
            <div>
                <img src={blog.image || imagex} className='img-blog-list' alt="Blog thumbnail"/>
            </div>
            <div className='mx-2'>
                <div className='date-blog-list'>{blog.date}</div>
                <div className='title-blog-list'>{blog.title}</div>
                <div className='content-blog-list'
                dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 100) }}
                >                       
                </div>
            </div>
        </div>
    );
}

const BlogContent = () => {
    const [isModelOpen, setIsModelOpen] = useState(0);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [image, setImage] = useState(null);
    const [currentBlog, setCurrentBlog] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all blogs
    useEffect(() => {
        const apiUrl = 'http://localhost:5000/api/blogs';
        axios
            .get(apiUrl)
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    setBlogs(response.data);
                } else {
                    setError("No blogs found.");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error.message);
                setError("Failed to fetch blogs. Please try again later.");
                setLoading(false);
            });
    }, []);

    // Add new blog
    const handleAddBlog = () => {
        const newBlog = {
            title,
            hashtags,
            content,
            image,
            date: new Date().toLocaleDateString(),
        };

        axios
            .post('http://localhost:5000/api/blogs', newBlog)
            .then((response) => {
                setBlogs([...blogs, response.data]);
                setTitle('');
                setHashtags('');
                setContent('');
                setImage(null);
            })
            .catch((error) => {
                console.error('Error adding blog:', error.message);
                setError("Failed to add blog. Please try again.");
            });
    };

    // Update blog
    const handleUpdateBlog = () => {
        const updatedBlog = {
            id: currentBlog.id,
            title,
            hashtags,
            content,
            image,
        };

        axios
            .put(`http://localhost:5000/api/blogs/${currentBlog.id}`, updatedBlog)
            .then((response) => {
                setBlogs(blogs.map(blog => 
                    blog.id === currentBlog.id ? response.data : blog
                ));
                closeModel();
            })
            .catch((error) => {
                console.error('Error updating blog:', error.message);
                setError("Failed to update blog. Please try again.");
            });
    };

    // Delete blog
    const handleDeleteBlog = () => {
        axios
            .delete(`http://localhost:5000/api/blogs/${currentBlog.id}`)
            .then(() => {
                setBlogs(blogs.filter(blog => blog.id !== currentBlog.id));
                closeModel();
            })
            .catch((error) => {
                console.error('Error deleting blog:', error.message);
                setError("Failed to delete blog. Please try again.");
            });
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image']
        ]
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const openModel = (blog) => {
        setCurrentBlog(blog);
        setTitle(blog.title);
        setHashtags(blog.hashtags);
        setContent(blog.content);
        setImage(blog.image);
        setIsModelOpen(1);
    }

    const closeModel = () => {
        setIsModelOpen(0);
        setCurrentBlog(null);
        setTitle(''); 
        setHashtags('');
        setContent('');
        setImage(null);
    };

    return (
        <>
            {isModelOpen === 1 && (
                <>
                    <div className="overfl" onClick={closeModel}></div>
                    <div className="edit-blog-modal">
                        <div className="center-edit-blog">
                            <div className="d-flex justify-content-between">
                                <h4>Edit Blog</h4>
                                <IoClose className="cross-svg" onClick={closeModel}/>
                            </div>
                            <div className='mt-4'>Title</div>
                            <input 
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <div className='mt-4'>Hashtags</div>
                            <input 
                                className="form-control"
                                value={hashtags}
                                onChange={(e) => setHashtags(e.target.value)}
                            />

                            <div className='mt-4'>Image</div>
                            <input 
                                type="file" 
                                accept="image/*"
                                className="form-control"
                                onChange={handleImageUpload}
                            />

                            <div className='mt-4'>Content</div>
                            <div className="react-quill-cont">
                                <ReactQuill 
                                    theme="snow"  
                                    className='react-quill' 
                                    value={content}
                                    onChange={setContent}
                                    modules={modules}
                                    required
                                />
                            </div>
                            <div className="d-flex justify-content-end mt-3">
                                <div 
                                    className="prb-1 mx-2" 
                                    onClick={handleUpdateBlog}
                                >
                                    <div>Update</div>
                                </div>
                                <div 
                                    className="prb-1 bg-danger text-white" 
                                    onClick={handleDeleteBlog}
                                >
                                    <div>Delete</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <div className="container p-0">
                <div className="row">
                    <div className="col-md-6">
                        <div className="add-blog">
                            <h3>Add New <span className='span fs-small'>Blog</span></h3>
                            <div className='mt-4'>Title</div>
                            <input 
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <div className='mt-4'>Hashtags</div>
                            <input 
                                className="form-control"
                                value={hashtags}
                                onChange={(e) => setHashtags(e.target.value)}
                            />

                            <div className='mt-4'>Image</div>
                            <input 
                                type="file" 
                                accept="image/*"
                                className="form-control"
                                onChange={handleImageUpload}
                            />

                            <div className='mt-4'>Content</div>
                            <div className="react-quill-cont">
                                <ReactQuill 
                                    theme="snow"  
                                    className='react-quill' 
                                    value={content}
                                    onChange={setContent}
                                    modules={modules}
                                    required
                                />
                            </div>
                            <div className="d-flex justify-content-center">
                                <div 
                                    className="prb-1"
                                    onClick={handleAddBlog}
                                >
                                    <div>Submit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="view-blog">
                            <h3><span className='span fs-small'>Blog</span> List</h3>
                            <div className="blog-list">
                                {loading ? (
                                    <div>Loading blogs...</div>
                                ) : error ? (
                                    <div className="text-danger">{error}</div>
                                ) : blogs.length === 0 ? (
                                    <div>No blogs available.</div>
                                ) : (
                                    blogs.map(blog => (
                                        <BlogListItem 
                                            key={blog.id} 
                                            blog={blog} 
                                            onClick={openModel}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogContent;