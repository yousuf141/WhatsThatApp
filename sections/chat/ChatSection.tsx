import React from "react";
import { FlatList, View } from "react-native";
import { Button, Card, Divider, Text, TextInput } from "react-native-paper";

import { type RouteProp } from "@react-navigation/native";

import { type ChatMetadata } from "../../models/chat/ChatMetadata";
import { type Message } from "../../models/chat/message";

import { useAuth } from "../../providers/AuthProvider";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useModal } from "../../hooks/useModal";

import { useChatDetailsSearch } from "../../hooks/chat/useChatDetailsSearch";

import { chatService } from "../../services/chatService";

import Loading from "../../components/Loading";
import UserIcon from "../../components/user/UserIcon";

import AddContactToChatModal from "../../components/modals/AddContactToChatModal";
import RemoveContactFromChatModal from "../../components/modals/RemoveContactFromChatModal";
import EditMessageModal from "../../components/modals/EditMessageModal";

interface ChatSectionProps {
  route: RouteProp<{ params: { chatMeta: ChatMetadata } }>;
}

const ChatSection: React.FC<ChatSectionProps> = ({ route }) => {
  const chatMetaId: number = route.params.chatMeta.id;
  const chatMetaName: string = route.params.chatMeta.name;

  const [auth] = useAuth();
  const snackbar = useSnackbar();

  // Chat Details States
  const limit = 100;
  const [offset] = React.useState(0);
  const [refreshChat, setRefreshChat] = React.useState(false);

  const [newMessage, setNewMessage] = React.useState("");

  const chatDetailsSearch = useChatDetailsSearch(
    { id: chatMetaId, limit, offset },
    auth.key as string,
    refreshChat
  );

  const addContactToChatModal = useModal();
  const removeContactFromChatModal = useModal();

  // Message States
  const [messageToEdit, setMessageToEdit] = React.useState<Message>();

  const editMessageModal = useModal();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRefreshChat((x) => !x);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function handleRemoveContactFromChat(): void {
    removeContactFromChatModal.show();
  }

  function handleAddContactToChat(): void {
    addContactToChatModal.show();
  }

  async function handleCreateMessage(): Promise<void> {
    const res = await chatService.createMessage(
      chatMetaId,
      newMessage,
      auth.key as string
    );
    if (!res.success) {
      snackbar.show("Error: Failed to send message.");
    } else {
      setRefreshChat((x) => !x);
      setNewMessage("");
    }
  }

  function handleEditMessage(message: Message): void {
    setMessageToEdit(message);
    editMessageModal.show();
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
      <View style={{ flex: 1 }}>
        {renderActionBar()}
        <Divider />
        {renderMessages()}
      </View>
    );
  }

  function renderMessages(): JSX.Element {
    if (chatDetailsSearch.chatDetails == null) return <></>;
    const messages = chatDetailsSearch.chatDetails.messages;

    if (messages.length === 0) return <Text>No messages...</Text>;

    return (
      <FlatList
        contentContainerStyle={{
          flexDirection: "column",
        }}
        inverted
        data={chatDetailsSearch.chatDetails.messages}
        renderItem={({ item }) => {
          let author = `${item.author.firstName} ${item.author.lastName}`;
          const isAuthor = auth.userId === item.author.id;
          if (isAuthor) author = "You";

          return (
            <Card
              key={item.id}
              contentStyle={{
                flex: 1,
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 0.8 }}>
                <Card.Title
                  titleStyle={{ fontWeight: "bold" }}
                  title={author}
                  subtitle={new Date(item.timestamp).toLocaleString()}
                />
                <Card.Content>
                  <Text>{item.message}</Text>
                </Card.Content>
              </View>
              {isAuthor ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onPress={() => {
                      handleEditMessage(item);
                    }}
                    mode="contained-tonal"
                  >
                    Edit
                  </Button>
                </View>
              ) : (
                <></>
              )}
            </Card>
          );
        }}
      />
    );
  }

  function renderMessageActions(): JSX.Element {
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
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <Button
          mode="contained"
          style={{ marginLeft: 10, alignSelf: "center" }}
          onPress={() => {
            void handleCreateMessage();
          }}
        >
          Send
        </Button>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View style={{ flex: 0.9 }}>
        {renderHeader()}
        <Divider />
        {renderMainContent()}
      </View>
      <Divider />
      {renderMessageActions()}
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
      <EditMessageModal
        visible={editMessageModal.visible}
        hide={editMessageModal.hide}
        chatId={chatMetaId}
        message={messageToEdit as Message}
        refresh={() => {
          setRefreshChat((x) => !x);
        }}
      />
    </View>
  );
};
export default ChatSection;
