import React from "react";
import { View } from "react-native";

import ProfileImage from "../../components/profile/ProfileImage";
import ProfileInfo from "../../components/profile/ProfileInfo";

const SettingsSection: React.FC = () => {
  return (
    <View>
      <ProfileImage />
      <ProfileInfo />
    </View>
  );
};
export default SettingsSection;
