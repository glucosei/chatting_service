package dev.caustudymatch.chatting;

import dev.caustudymatch.chatting.domain.AppUser;
import dev.caustudymatch.chatting.domain.AppUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class Application implements CommandLineRunner {
    private final AppUserRepository appUserRepository;

    public Application(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        // for debug
        appUserRepository.save(new AppUser("user", "$2a$10$eof1KMpo.Zag39ikFyVW7OXxXRhBLCCnWvg2INHQap2hZENmJZzaO", "USER"));
        appUserRepository.save(new AppUser("admin", "$2a$10$fCcz7iZRPSlB6X1AoCswCOeWxUsXugwV9GHsGIJjzSc7Oao4JxVdu", "ADMIN"));
    }
}

