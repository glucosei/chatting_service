package dev.caustudymatch.chatting.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Chatroom extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Setter
    @Getter
    private String title;

    @Setter
    @Getter
    @ManyToMany(mappedBy = "chatrooms")
    @JsonIgnore
    private Set<AppUser> participants = new HashSet<>();

    @Getter
    @OneToMany(fetch = FetchType.LAZY)
    private List<Chat> chats = List.of();

    public Chatroom(String title) {
        this.title = title;
    }

    public void addChat(Chat chat) {
        chats.add(chat);
    }

    public boolean deleteChat(Chat chat) {
        return chats.remove(chat);
    }
}
