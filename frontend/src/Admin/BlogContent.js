import React, { useState } from "react";
import "./BlogContent.css";
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
                <div className='content-blog-list'>
                    {blog.content.substring(0, 100)}...
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
    const [blogs, setBlogs] = useState([
        {
            id: 1,
            date: '12-12-12',
            title: 'Sample Blog',
            hashtags: '#react #webdev',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            image: null
        },
        {
            id: 1,
            date: '12-12-12',
            title: 'Sample Blog',
            hashtags: '#react #webdev',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            image: null
        },
        {
            id: 1,
            date: '12-12-12',
            title: 'Sample Blog',
            hashtags: '#react #webdev',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            image: null
        },
        {
            id: 1,
            date: '12-12-12',
            title: 'Sample Blog',
            hashtags: '#react #webdev',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            image: null
        },
        {
            id: 1,
            date: '12-12-12',
            title: 'Sample Blog',
            hashtags: '#react #webdev',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            image: null
        },
        {
            id: 1,
            date: '12-12-12',
            title: 'Sample Blog',
            hashtags: '#react #webdev',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            image: null
        }
    ]);

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
        setImage(null);
    }

    const handleUpdate = () => {
        setBlogs(prevBlogs => 
            prevBlogs.map(blog => 
                blog.id === currentBlog.id 
                ? { ...blog, title, hashtags, content, image } 
                : blog
            )
        );
        closeModel();
    }

    const handleDelete = () => {
        setBlogs(prevBlogs => 
            prevBlogs.filter(blog => blog.id !== currentBlog.id)
        );
        closeModel();
    }

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
                        {image && (
                            <div className="mt-2 image-preview" style={{
                                width: '100px', 
                                height: '100px', 
                                overflow: 'hidden',
                                border: '1px solid #ddd'
                            }}>
                                <img 
                                    src={image} 
                                    alt="Blog preview" 
                                    style={{
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'cover'
                                    }} 
                                />
                            </div>
                        )}

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
                                onClick={handleUpdate}
                            >
                                <div>Update</div>
                            </div>
                            <div 
                                className="prb-1 bg-danger text-white" 
                                onClick={handleDelete}
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
                        {image && (
                            <div className="mt-2 image-preview" style={{
                                width: '100px', 
                                height: '100px', 
                                overflow: 'hidden',
                                border: '1px solid #ddd'
                            }}>
                                <img 
                                    src={image} 
                                    alt="Blog preview" 
                                    style={{
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'cover'
                                    }} 
                                />
                            </div>
                        )}

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
                                onClick={() => {
                                    setBlogs(prev => [...prev, {
                                        id: prev.length + 1,
                                        date: new Date().toLocaleDateString(),
                                        title,
                                        hashtags,
                                        content,
                                        image
                                    }]);
                                    setTitle('');
                                    setHashtags('');
                                    setContent('');
                                    setImage(null);
                                }}
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
                            {blogs.map(blog => (
                                <BlogListItem 
                                    key={blog.id} 
                                    blog={blog} 
                                    onClick={openModel}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default BlogContent;