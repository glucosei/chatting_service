package dev.caustudymatch.chatting.service;


import dev.caustudymatch.chatting.domain.Chat;
import dev.caustudymatch.chatting.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;

    @Transactional
    public Chat save(Chat chat){
        return chatRepository.save(chat);
    }
}
