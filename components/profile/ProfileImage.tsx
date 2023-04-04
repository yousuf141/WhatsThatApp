import React from "react";
import { View } from "react-native";
import { Avatar, Text } from "react-native-paper";

import Loading from "../../components/Loading";

interface ProfileImageProps {
  uri: string | undefined;
  loading: boolean;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ uri, loading }) => {
  if (loading) return <Loading />;

  if (uri == null)
    return <Text>Failed to get user image. Please try again.</Text>;

  return (
    <View style={{ display: "flex", alignSelf: "center", margin: 10 }}>
      <Avatar.Image source={{ uri }} size={200} />
    </View>
  );
};
export default ProfileImage;
