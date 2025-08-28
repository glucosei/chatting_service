package dev.caustudymatch.chatting.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable=false, updatable=false)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;


    public void joinChatroom(Chatroom chatroom) {
        this.chatrooms.add(chatroom);
        chatroom.getParticipants().add(this); // 양방향 동기화
    }


    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name="chatroom_participants",joinColumns =
            {
                    @JoinColumn(name="participantid")
            }, inverseJoinColumns = {
            @JoinColumn(name = "id")
    })
    private Set<Chatroom> chatrooms = new HashSet<>();


}
