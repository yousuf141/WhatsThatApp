import React from "react";
import { View } from "react-native";

import { useAuth } from "../../providers/AuthProvider";

import { useRefresh } from "../../hooks/useRefresh";
import { useProfileImage } from "../../hooks/profile/useProfileImage";
import { useProfileInfo } from "../../hooks/profile/useProfileInfo";

import ProfileImage from "../../components/profile/ProfileImage";
import ProfileInfo from "../../components/profile/ProfileInfo";
import ProfileActions from "../../components/profile/ProfileActions";

const SettingsSection: React.FC = () => {
  const [auth] = useAuth();

  const { shouldRefresh, refresh } = useRefresh();

  const profileImage = useProfileImage(auth.userId as number, shouldRefresh);
  const profileInfo = useProfileInfo(auth.userId as number, shouldRefresh);

  return (
    <View style={{ flex: 1 }}>
      <ProfileImage uri={profileImage.uri} loading={profileImage.loading} />
      <ProfileInfo user={profileInfo.user} loading={profileInfo.loading} />
      <ProfileActions refresh={refresh} />
    </View>
  );
};
export default SettingsSection;
