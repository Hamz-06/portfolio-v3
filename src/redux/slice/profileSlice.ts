import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootMainLayoutStore } from "../store/mainLayoutStore";
import { useSelector } from "react-redux";
import { Profile } from "@/schema/schema-types";

interface ProfileState {
  profile: Profile | null;
}

const initialState: ProfileState = {
  profile: null
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<NonNullable<Profile>>) => {
      const { email_address, github_link, linkedin_link, project_versions } = action.payload;
      state.profile = {
        email_address: email_address,
        github_link: github_link,
        linkedin_link: linkedin_link,
        project_versions: project_versions.map((version) => ({
          version_number: version.version_number,
          version_url: version.version_url
        }))
      }
    },
  }
})

export const { setProfile } = profileSlice.actions;


export const useProfile = (): ProfileState['profile'] =>
  useSelector((state: RootMainLayoutStore) => state.profileProvider.profile)

export default profileSlice.reducer