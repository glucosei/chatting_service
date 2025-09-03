package dev.caustudymatch.chatting.web;


import dev.caustudymatch.chatting.domain.Chat;
import dev.caustudymatch.chatting.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.security.Principal;


@Controller
@RequiredArgsConstructor
public class ChatController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final ChatService chatService;
    @MessageMapping("/chat.sendMessage/{chatroomTitle}")
    @SendTo("/sub/chat/{chatroomTitle}")
    public Chat sendMessage(@Payload Chat chat) {
        //logger.warn("Received message for chatroom: " + chatroomTitle);
        //logger.warn(chat.toString());

        return chatService.save(chat);
    }
}