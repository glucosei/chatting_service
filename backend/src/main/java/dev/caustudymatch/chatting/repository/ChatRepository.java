package dev.caustudymatch.chatting.repository;

import dev.caustudymatch.chatting.domain.Chat;
import dev.caustudymatch.chatting.domain.Chatroom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    /**
     * 특정 Chatroom에 속한 모든 Chat 메시지를 조회합니다.
     * @param chatroom 조회할 Chatroom 엔티티
     * @return 해당 Chatroom에 속한 Chat 메시지 리스트
     */
    List<Chat> findByChatroom(Chatroom chatroom);
}
