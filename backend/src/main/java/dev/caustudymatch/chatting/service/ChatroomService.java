package dev.caustudymatch.chatting.service;

import dev.caustudymatch.chatting.domain.Chat;
import dev.caustudymatch.chatting.domain.Chatroom;
import dev.caustudymatch.chatting.dto.ConnectRequest;
import dev.caustudymatch.chatting.dto.ConnectResponse;
import dev.caustudymatch.chatting.dto.CreateRequest;
import dev.caustudymatch.chatting.repository.ChatRepository;
import dev.caustudymatch.chatting.repository.ChatroomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatroomService {
    private final ChatroomRepository chatroomRepository;
    private final ChatRepository chatRepository;

    @Transactional
    public Chatroom create(CreateRequest createRequest) {
        return chatroomRepository.save(Chatroom.builder()
                .title(createRequest.getTitle())
                .build());
    }

    public List<ConnectResponse> connect(ConnectRequest connectRequest) {
        Chatroom chatroom = chatroomRepository.findByTitle(connectRequest.getTitle())
                .orElseThrow(() -> new NoSuchElementException("Chatroom not found with title: " + connectRequest.getTitle()));
        List<Chat> chatList = chatRepository.findByChatroom(chatroom);
        List<ConnectResponse> responseList = new ArrayList<>();
        for(Chat chat : chatList) {
            responseList.add(ConnectResponse.builder()
                            .user(chat.getUsername())
                            .message(chat.getMessage())
                            .chatroom(chatroom)
                            .build());
        }
        return responseList;
    }

    public List<Chatroom> selectChatrooms() {
        return chatroomRepository.findAll();
    }


}
