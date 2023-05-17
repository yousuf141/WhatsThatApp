import React from "react";
import { Avatar, IconButton } from "react-native-paper";

import { type User } from "../../models/user/user";
import { userService } from "../../services/userService";
import { blobToBase64 } from "../../utils/files";

interface UserIconProps {
  user: User;
  authKey: string;
}

const UserIcon: React.FC<UserIconProps> = ({ user, authKey }) => {
  const [uri, setUri] = React.useState("");

  React.useEffect(() => {
    void (async () => {
      const res = await userService.getPhotoById(user.id, authKey);
      if (res.data != null) {
        const image = await blobToBase64(res.data);
        setUri(image as string);
      }
    })();
  }, []);

  return <Avatar.Image style={{ margin: 2 }} source={{ uri }} size={35} />;
};
export default UserIcon;
