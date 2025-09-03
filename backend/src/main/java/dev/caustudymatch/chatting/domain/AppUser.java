package dev.caustudymatch.chatting.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AppUser extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable=false, updatable=false)
    private Long id;


    @Column(nullable = false, unique = true)
    private String username;


    @Column(nullable = false)
    private String password;


    @Column(nullable = false)
    private String role;


    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name="chatroom_participants",joinColumns =
            {
                    @JoinColumn(name="participant_id")
            }, inverseJoinColumns = {
            @JoinColumn(name = "chatroom_id")
    })
    private Set<Chatroom> chatRooms = new HashSet<>();


}
