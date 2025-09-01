package dev.caustudymatch.chatting.web;

import dev.caustudymatch.chatting.domain.AppUser;
import dev.caustudymatch.chatting.domain.AppUserRepository;
import dev.caustudymatch.chatting.domain.Chatroom;
import dev.caustudymatch.chatting.domain.ChatroomRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;

@RestController
public class ChatroomController {
    private final AppUserRepository appUserRepository;
    private final ChatroomRepository repository;

    public ChatroomController(AppUserRepository appUserRepository, ChatroomRepository repository) {
        this.appUserRepository = appUserRepository;
        this.repository = repository;
    }

    @GetMapping("/room")
    public Iterable<Chatroom> getRooms() {
        return repository.findAll();
    }

    @GetMapping("/chatroom/{username}")
    public Iterable<Chatroom> getUserRooms(@PathVariable String username) {
        Optional<AppUser> user = appUserRepository.findByUsername(username);
        if(user.isPresent()) {
            return user.get().getChatrooms();
        } else {
            return new HashSet<>();
        }
    }

    @GetMapping("/room/test")
    public String getTest() {
        return "ok";
    }
}
