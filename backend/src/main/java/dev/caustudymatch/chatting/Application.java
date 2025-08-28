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

    public Application(ChatroomRepository chatroomRepository, AppUserRepository appUserRepository) {
        this.chatroomRepository = chatroomRepository;
        this.appUserRepository = appUserRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        AppUser user = new AppUser("user", "$2a$10$eof1KMpo.Zag39ikFyVW7OXxXRhBLCCnWvg2INHQap2hZENmJZzaO", "USER");
        AppUser admin = new AppUser("admin", "$2a$10$fCcz7iZRPSlB6X1AoCswCOeWxUsXugwV9GHsGIJjzSc7Oao4JxVdu", "ADMIN");
        appUserRepository.saveAll(Arrays.asList(user, admin));
        chatroomRepository.save(new Chatroom("그냥 대화방", Set.of(user, admin)));
    }
}

