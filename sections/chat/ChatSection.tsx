import React from "react";
import { View } from "react-native";
import { Button, Divider, Text } from "react-native-paper";

import { type RouteProp } from "@react-navigation/native";

import { type ChatMetadata } from "../../models/chat/ChatMetadata";

import { useAuth } from "../../providers/AuthProvider";
import { useModal } from "../../hooks/useModal";

import { useChatDetailsSearch } from "../../hooks/chat/useChatDetailsSearch";

import Loading from "../../components/Loading";
import UserIcon from "../../components/user/UserIcon";

import AddContactToChatModal from "../../components/modals/AddContactToChatModal";
import RemoveContactFromChatModal from "../../components/modals/RemoveContactFromChatModal";

interface ChatSectionProps {
  route: RouteProp<{ params: { chatMeta: ChatMetadata } }>;
}

const ChatSection: React.FC<ChatSectionProps> = ({ route }) => {
  const chatMetaId: number = route.params.chatMeta.id;
  const chatMetaName: string = route.params.chatMeta.name;

  const [auth] = useAuth();

  const limit = 10;
  const [offset, setOffset] = React.useState(0);
  const [refreshChat, setRefreshChat] = React.useState(false);

  const chatDetailsSearch = useChatDetailsSearch(
    { id: chatMetaId, limit, offset },
    auth.key as string,
    refreshChat
  );

  const addContactToChatModal = useModal();
  const removeContactFromChatModal = useModal();

  function handleRemoveContactFromChat(): void {
    removeContactFromChatModal.show();
  }

  function handleAddContactToChat(): void {
    addContactToChatModal.show();
  }

  function renderHeader(): JSX.Element {
    return (
      <View>
        <Text
          style={{ fontWeight: "bold", marginVertical: 10 }}
          variant="headlineSmall"
        >
          {chatMetaName}
        </Text>
      </View>
    );
  }

  function renderActionBar(): JSX.Element {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            flex: 1,
            overflow: "scroll",
          }}
        >
          {chatDetailsSearch.chatDetails?.members.map((member, index) => {
            if (member.id === auth.userId) return null;
            return (
              <UserIcon
                key={`icon-${member.id}-${index}`}
                user={member}
                authKey={auth.key as string}
              />
            );
          }) ?? <></>}
        </View>
        <View style={{ flexDirection: "row" }}>
          <Button
            onPress={handleRemoveContactFromChat}
            mode="contained-tonal"
            style={{ alignSelf: "center" }}
          >
            View/Edit
          </Button>
          <Button
            onPress={handleAddContactToChat}
            mode="contained"
            style={{ alignSelf: "center" }}
          >
            Add
          </Button>
        </View>
      </View>
    );
  }

  function renderMainContent(): JSX.Element {
    if (chatDetailsSearch.loading) return <Loading />;

    return (
      <View>
        {renderActionBar()}
        <Divider />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {renderHeader()}
      <Divider />
      {renderMainContent()}
      <AddContactToChatModal
        visible={addContactToChatModal.visible}
        hide={addContactToChatModal.hide}
        chatId={chatMetaId}
        existingContacts={chatDetailsSearch.chatDetails?.members ?? []}
        refresh={() => {
          setRefreshChat((x) => !x);
        }}
      />
      <RemoveContactFromChatModal
        visible={removeContactFromChatModal.visible}
        hide={removeContactFromChatModal.hide}
        chatId={chatMetaId}
        contacts={chatDetailsSearch.chatDetails?.members ?? []}
        refresh={() => {
          setRefreshChat((x) => !x);
        }}
      />
    </View>
  );
};
export default ChatSection;
