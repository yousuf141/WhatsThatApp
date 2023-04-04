import React from "react";
import { View } from "react-native";

import { useAuth } from "../../providers/AuthProvider";

import { useRefresh } from "../../hooks/useRefresh";
import { useProfileImage } from "../../hooks/profile/useProfileImage";
import { useProfileInfo } from "../../hooks/profile/useProfileInfo";
import { useModal } from "../../hooks/useModal";

import ProfileImage from "../../components/profile/ProfileImage";
import ProfileInfo from "../../components/profile/ProfileInfo";
import ProfileActions from "../../components/profile/ProfileActions";
import UpdateProfileInfoModal from "../../components/modals/UpdateProfileInfoModal";

const SettingsSection: React.FC = () => {
  const [auth] = useAuth();

  const imageRefresh = useRefresh();
  const profileImage = useProfileImage(
    auth.userId as number,
    imageRefresh.shouldRefresh
  );

  const updateProfileInfoModal = useModal();
  const infoRefresh = useRefresh();
  const profileInfo = useProfileInfo(
    auth.userId as number,
    infoRefresh.shouldRefresh
  );

  function renderUpdateProfileInfoModal(): React.ReactNode {
    if (profileInfo.user == null) return <></>;

    return (
      <UpdateProfileInfoModal
        visible={updateProfileInfoModal.visible}
        hide={updateProfileInfoModal.hide}
        refresh={infoRefresh.refresh}
        user={profileInfo.user}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ProfileImage uri={profileImage.uri} loading={profileImage.loading} />
      <ProfileInfo user={profileInfo.user} loading={profileInfo.loading} />
      <ProfileActions
        refresh={imageRefresh.refresh}
        onEdit={updateProfileInfoModal.show}
      />
      {renderUpdateProfileInfoModal()}
    </View>
  );
};
export default SettingsSection;
