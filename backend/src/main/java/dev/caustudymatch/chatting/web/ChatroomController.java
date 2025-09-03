package dev.caustudymatch.chatting.web;


import dev.caustudymatch.chatting.domain.Chat;
import dev.caustudymatch.chatting.domain.Chatroom;
import dev.caustudymatch.chatting.dto.ConnectRequest;
import dev.caustudymatch.chatting.dto.ConnectResponse;
import dev.caustudymatch.chatting.dto.CreateRequest;
import dev.caustudymatch.chatting.service.ChatroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/chatroom")
public class ChatroomController {
    private final ChatroomService chatroomService;

    @PostMapping("/create")
    public Chatroom createRoom(@RequestBody CreateRequest createRequest) {
        return chatroomService.create(createRequest);
    }

    @PostMapping("/connect")
    public List<ConnectResponse> connect(@RequestBody ConnectRequest connectRequest) {
        return chatroomService.connect(connectRequest);
    }

    @PostMapping("/select")
    public List<Chatroom> selectChatRooms(){
        return chatroomService.selectChatrooms();
    }

}
