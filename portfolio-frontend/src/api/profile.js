import api from './base';

const ProfileService = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
  updateProfilePicture: (image) => {
    const formData = new FormData();
    formData.append('image', image);
    return api.put('/profile/picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
};

export default ProfileService;