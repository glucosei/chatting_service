package dev.caustudymatch.chatting.web;

import dev.caustudymatch.chatting.domain.Chatroom;
import dev.caustudymatch.chatting.domain.ChatroomRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatroomController {
    private final ChatroomRepository repository;

    public ChatroomController(ChatroomRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/room")
    public Iterable<Chatroom> getRooms() {
        return repository.findAll();
    }

    @GetMapping("/room/test")
    public String getTest() {
        return "ok";
    }
}
