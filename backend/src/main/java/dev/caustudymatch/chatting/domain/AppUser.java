package dev.caustudymatch.chatting.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AppUser extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable=false, updatable=false)
    private Long id;

    @Setter
    @Getter
    @Column(nullable = false, unique = true)
    private String username;

    @Setter
    @Getter
    @Column(nullable = false)
    private String password;

    @Setter
    @Getter
    @Column(nullable = false)
    private String role;

    @Getter
    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name="chatroom_participants",joinColumns =
            {
                    @JoinColumn(name="participant_id")
            }, inverseJoinColumns = {
            @JoinColumn(name = "chatroom_id")
    })
    private Set<Chatroom> chatrooms = new HashSet<>();

    public AppUser(String username, String password, String role)
    {
        super();
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public void joinChatroom(Chatroom chatroom) {
        this.chatrooms.add(chatroom);
        chatroom.getParticipants().add(this);
    }

    public boolean leaveChatroom(Chatroom chatroom) {
        return chatrooms.remove(chatroom);
    }
}
