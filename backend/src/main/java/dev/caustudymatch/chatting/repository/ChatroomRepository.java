package dev.caustudymatch.chatting.repository;

import dev.caustudymatch.chatting.domain.Chatroom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatroomRepository extends JpaRepository<Chatroom, Long> {
    Optional<Chatroom> findByTitle(String title);
}
