import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootMainLayoutStore } from "../store/mainLayoutStore";
import { useSelector } from "react-redux";
import { Profile } from "@/schema/schema-types";

type ProfileRedux = {
  emailAddress: string | null,
  githubLink: string | null,
  linkedinLink: string | null,
  projectVersions: {
    versionNumber: string;
    versionUrl: string;
  }[]
}

interface ProfileState {
  profile: ProfileRedux;
}

const initialState: ProfileState = {
  profile: {
    emailAddress: null,
    githubLink: null,
    linkedinLink: null,
    projectVersions: []
  }
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<NonNullable<Profile>>) => {
      const { email_address, github_link, linkedin_link, project_versions } = action.payload;

      state.profile.emailAddress = email_address;
      state.profile.githubLink = github_link;
      state.profile.linkedinLink = linkedin_link;
      state.profile.projectVersions = project_versions.map((version) => ({
        versionNumber: version.version_number,
        versionUrl: version.version_url
      }));
    },
  }
})

export const { setProfile } = profileSlice.actions;


export const useProfile = (): ProfileState['profile'] =>
  useSelector((state: RootMainLayoutStore) => state.profileProvider.profile)

export default profileSlice.reducer