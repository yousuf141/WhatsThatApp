import React from "react";
import { View } from "react-native";

import ProfileImage from "../../components/profile/ProfileImage";
import ProfileInfo from "../../components/profile/ProfileInfo";
import ProfileActions from "../../components/profile/ProfileActions";

const SettingsSection: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <ProfileImage />
      <ProfileInfo />
      <ProfileActions />
    </View>
  );
};
export default SettingsSection;
