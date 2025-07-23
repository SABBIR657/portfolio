import api from './base';

const BlogService = {
  getAll: () => api.get('/blog'),
  getById: (id) => api.get(`/blog/${id}`),
  create: (data) => api.post('/blog', data),
  update: (id, data) => api.put(`/blog/${id}`, data),
  delete: (id) => api.delete(`/blog/${id}`),
  updateCover: (id, image) => {
    const formData = new FormData();
    formData.append('coverImage', image);
    return api.put(`/blog/${id}/cover`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default BlogService;