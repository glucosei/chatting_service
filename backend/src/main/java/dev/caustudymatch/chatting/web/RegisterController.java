package dev.caustudymatch.chatting.web;

import dev.caustudymatch.chatting.domain.AccountCredentials;
import dev.caustudymatch.chatting.domain.AppUser;
import dev.caustudymatch.chatting.repository.AppUserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegisterController {
    private final AppUserRepository repository;

    PasswordEncoder encoder;

    public RegisterController(AppUserRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AccountCredentials credentials) {
        repository.save(AppUser.builder()
                        .username(credentials.username())
                        .password(encoder.encode(credentials.password()))
                        .role("USER")
                        .build());

        return ResponseEntity.ok().build();
    }

}
