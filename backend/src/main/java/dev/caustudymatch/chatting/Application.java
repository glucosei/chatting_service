package dev.caustudymatch.chatting;

import dev.caustudymatch.chatting.domain.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.Arrays;
import java.util.Set;

@SpringBootApplication
@EnableJpaAuditing
public class Application implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(
            Application.class
    );

    private final ChatroomRepository chatroomRepository;
    private final AppUserRepository appUserRepository;
    private final ChatRepository chatRepository;

    public Application(ChatroomRepository chatroomRepository, AppUserRepository appUserRepository, ChatRepository chatRepository) {
        this.chatroomRepository = chatroomRepository;
        this.appUserRepository = appUserRepository;
        this.chatRepository = chatRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        AppUser user = new AppUser("user", "$2a$10$eof1KMpo.Zag39ikFyVW7OXxXRhBLCCnWvg2INHQap2hZENmJZzaO", "USER");
        AppUser admin = new AppUser("admin", "$2a$10$fCcz7iZRPSlB6X1AoCswCOeWxUsXugwV9GHsGIJjzSc7Oao4JxVdu", "ADMIN");

        Chatroom c1 = new Chatroom("그냥 대화방");
        Chatroom c2 = new Chatroom("나만의 대화방");

        user.joinChatroom(c1);
        admin.joinChatroom(c1);
        admin.joinChatroom(c2);

        appUserRepository.saveAll(Arrays.asList(user, admin));

        Chat chat1 = new Chat(user, "hi");
        Chat chat2 = new Chat(admin, "hello");

        c1.addChat(chat1);
        c1.addChat(chat2);

        chatRepository.saveAll(Arrays.asList(chat1, chat2));
    }
}

