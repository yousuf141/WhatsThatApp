import React from "react";
import { FlatList, View } from "react-native";
import { Button, Divider, List, TextInput } from "react-native-paper";
import { type NavigationProp } from "@react-navigation/native";

import { type ChatMetadata } from "../../models/chat/ChatMetadata";

import { useAuth } from "../../providers/AuthProvider";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useModal } from "../../hooks/useModal";

import { useChatsSearch } from "../../hooks/chat/useChatsSearch";

import { chatService } from "../../services/chatService";

import Loading from "../../components/Loading";
import EditChatMetaModal from "../../components/modals/EditChatMetaModal";

interface ChatsSectionProps {
  navigation: NavigationProp<any, any>;
}

const ChatsSection: React.FC<ChatsSectionProps> = ({ navigation }) => {
  const [auth] = useAuth();
  const snackbar = useSnackbar();

  // new chat states
  const [newChatName, setNewChatName] = React.useState("");

  // chats states
  const [chatsRefresh, setChatsRefresh] = React.useState(false);
  const chatsSearch = useChatsSearch(auth.key as string, chatsRefresh);

  // update chat modal
  const [chatToEdit, setChatToEdit] = React.useState<ChatMetadata>();
  const editChatMetaModal = useModal();

  React.useEffect(() => {
    if (chatsSearch.error) snackbar.show(`Error: ${chatsSearch.errorMessage}`);
  }, [chatsSearch.errorMessage]);

  async function handleCreateNewChat(): Promise<void> {
    if (newChatName.length === 0) {
      snackbar.show("Error: Invalid chat name.");
      return;
    }

    const res = await chatService.createChat(newChatName, auth.key as string);
    if (!res.success) {
      snackbar.show("Error: Failed to create the new chat.");
    } else {
      snackbar.show("Successfully created the new chat.");
      setChatsRefresh((x) => !x);
    }
  }

  function handleOpenChat(chatMeta: ChatMetadata): void {
    navigation.navigate("ChatSection", { chatMeta });
  }

  function handleEditChatMeta(chatMeta: ChatMetadata): void {
    setChatToEdit(chatMeta);
    editChatMetaModal.show();
  }

  function renderChats(): JSX.Element {
    if (chatsSearch.loading) return <Loading />;

    return (
      <FlatList
        data={chatsSearch.chats}
        renderItem={({ item }) => renderChatItem(item)}
      />
    );
  }

  function renderChatItem(chat: ChatMetadata): JSX.Element {
    let description: string = " ";
    if (chat.lastMessage.message != null) {
      description = chat.lastMessage.message;
    }

    return (
      <>
        <View
          key={chat.id}
          style={{
            flex: 1,
            padding: 5,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <List.Item
            onPress={() => {
              handleOpenChat(chat);
            }}
            titleStyle={{ fontWeight: "700" }}
            style={{ flex: 0.7 }}
            title={chat.name}
            description={description}
          />
          {renderChatItemActions(chat)}
        </View>
        <Divider />
      </>
    );
  }

  function renderChatItemActions(chat: ChatMetadata): JSX.Element {
    if (chat.creator.id !== auth.userId) return <></>;

    return (
      <View style={{ alignSelf: "center" }}>
        <Button
          onPress={() => {
            handleEditChatMeta(chat);
          }}
          mode="contained-tonal"
        >
          Edit
        </Button>
      </View>
    );
  }

  function renderChatsActions(): JSX.Element {
    return (
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          style={{ flexGrow: 1 }}
          placeholder="New chat name here..."
          value={newChatName}
          onChangeText={(e) => {
            setNewChatName(e);
          }}
        />
        <Button
          mode="contained"
          style={{ marginLeft: 10, alignSelf: "center" }}
          onPress={() => {
            void handleCreateNewChat();
          }}
        >
          New Chat
        </Button>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      {renderChats()}
      {renderChatsActions()}
      <EditChatMetaModal
        visible={editChatMetaModal.visible}
        chatToEdit={chatToEdit as ChatMetadata}
        hide={editChatMetaModal.hide}
        refresh={() => {
          setChatsRefresh((x) => !x);
        }}
      />
    </View>
  );
};
export default ChatsSection;
