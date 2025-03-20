import { create } from "zustand";

interface UserState {
  userProfile: any;
  setUserProfile: any;
}

const useUserProfileStore = create<UserState>((set) => ({
  userProfile: null,
  setUserProfile: (userProfile: any) => set({ userProfile }),
  addPost: (post) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        posts: [post.id, ...state.userProfile.posts],
      },
    })),
  deletePost: (postId) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        posts: state.userProfile.posts.filter((id) => id !== postId)
      },
    })),
}));

export default useUserProfileStore;
